import React, { useEffect, useState } from "react";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import SimpleModal from "./SimpleModal";
import { LoadingAnimation } from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";
import LikeModal from "./LikeModal";
import { SocketData } from "../context/SocketContext";

const PostCard = ({ type, value }) => {
  const [isLike, setIsLike] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = UserData();
  const { likePost, addComment, deletePost, loading, fetchPosts } = PostData();
  const formatDate = format(new Date(value.createdAt), "MMMM do");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [caption, setCaption] = useState(value.caption || "");
  const [captionLoading, setCaptionLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { onlineUsers } = SocketData();

  useEffect(() => {
    for (let i = 0; i < value.likes.length; i++) {
      if (value.likes[i] === user._id) setIsLike(true);
    }
  }, [value, user._id]);

  const likeHandler = () => {
    setIsLike(!isLike);
    likePost(value._id);
  };

  const addCommentHandler = (e) => {
    e.preventDefault();
    addComment(value._id, comment, setComment, setShow);
  };

  const closeModal = () => setShowModal(false);
  const deleteHandler = () => deletePost(value._id);
  const editHandler = () => {
    setShowModal(false);
    setShowInput(true);
  };
  const oncloseLike = () => setOpen(false);

  async function updateCaption() {
    setCaptionLoading(true);
    try {
      const { data } = await axios.put("/api/post/" + value._id, { caption });
      toast.success(data.message);
      fetchPosts();
      setShowInput(false);
      setCaptionLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setCaptionLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center pt-4 pb-12">
      <SimpleModal isOpen={showModal} onClose={closeModal}>
        <LikeModal isOpen={open} onClose={oncloseLike} id={value._id} />
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={editHandler}
            className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={deleteHandler}
            className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? <LoadingAnimation /> : "Delete"}
          </button>
        </div>
      </SimpleModal>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-6 w-full max-w-md transition hover:scale-[1.01] duration-200">
        <div className="flex items-center justify-between mb-4">
          <Link to={`/user/${value.owner._id}`} className="flex items-center gap-3">
            <img
              src={value.owner.profilePic.url}
              alt=""
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <p className="text-white font-semibold text-sm">{value.owner.name}</p>
              <span className="text-gray-300 text-xs">{formatDate}</span>
            </div>
            {onlineUsers.includes(value.owner._id) && (
              <span className="text-green-400 text-xl ml-2">●</span>
            )}
          </Link>
          {value.owner._id === user._id && (
            <button
              onClick={() => setShowModal(true)}
              className="text-white hover:text-gray-300 text-xl"
            >
              <BsThreeDotsVertical />
            </button>
          )}
        </div>

        <div className="mb-3">
          {showInput ? (
            <div className="flex gap-2 items-center">
              <input
                className="bg-white/20 text-white px-3 py-1 rounded-md focus:outline-none"
                type="text"
                placeholder="Enter Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <button
                onClick={updateCaption}
                className="text-sm bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                {captionLoading ? <LoadingAnimation /> : "Update"}
              </button>
              <button
                className="text-sm bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => setShowInput(false)}
              >
                X
              </button>
            </div>
          ) : (
            <p className="text-white text-sm">{value.caption}</p>
          )}
        </div>

        <div className="mb-4">
          {type === "post" ? (
            <img
              src={value.post.url}
              alt=""
              className="rounded-lg w-full object-cover"
            />
          ) : (
            <video
              src={value.post.url}
              className="w-full h-[400px] rounded-lg object-cover"
              autoPlay
              controls
            />
          )}
        </div>

        <div className="flex justify-between text-white mb-2">
          <div className="flex items-center gap-2">
            <span
              onClick={likeHandler}
              className="cursor-pointer text-2xl hover:scale-110 transition"
            >
              {isLike ? <IoHeartSharp className="text-red-500" /> : <IoHeartOutline />}
            </span>
            <button
              className="text-sm hover:underline"
              onClick={() => setOpen(true)}
            >
              {value.likes.length} likes
            </button>
          </div>
          <button
            className="flex items-center gap-1 text-sm hover:underline"
            onClick={() => setShow(!show)}
          >
            <BsChatFill />
            <span>{value.comments.length} comments</span>
          </button>
        </div>

        {show && (
          <form onSubmit={addCommentHandler} className="flex gap-2 mt-2">
            <input
              type="text"
              className="bg-white/20 text-white px-3 py-1 rounded-md w-full focus:outline-none"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-white/30 text-white px-4 py-1 rounded-md hover:bg-white/40 transition"
              type="submit"
            >
              Add
            </button>
          </form>
        )}

        <div className="mt-4">
          <p className="text-white font-semibold text-sm mb-1">Comments</p>
          <div className="max-h-40 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-500 pr-2">
            {value.comments && value.comments.length > 0 ? (
              value.comments.map((e) => (
                <Comment
                  value={e}
                  key={e._id}
                  user={user}
                  owner={value.owner._id}
                  id={value._id}
                />
              ))
            ) : (
              <p className="text-white text-sm">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

export const Comment = ({ value, user, owner, id }) => {
  const { deleteComment } = PostData();

  const deleteCommentHandler = () => {
    deleteComment(id, value._id);
  };

  return (
    <div className="flex items-start gap-2 text-white">
      <Link to={`/user/${value.user._id}`}>
        <img
          src={value.user.profilePic.url}
          className="w-8 h-8 rounded-full"
          alt=""
        />
      </Link>
      <div className="flex-1">
        <p className="font-semibold text-sm">{value.user.name}</p>
        <p className="text-gray-300 text-sm">{value.comment}</p>
      </div>
      {(owner === user._id || value.user._id === user._id) && (
        <button onClick={deleteCommentHandler} className="text-red-500">
          <MdDelete />
        </button>
      )}
    </div>
  );
};

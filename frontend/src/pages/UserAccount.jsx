import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import axios from "axios";
import { Loading } from "../components/Loading";
import { UserData } from "../context/UserContext";
import Modal from "../components/Modal";
import { SocketData } from "../context/SocketContext";

const UserAccount = ({ user: loggedInUser }) => {
  const navigate = useNavigate();
  const { posts, reels } = PostData();
  const [user, setUser] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/" + params.id);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  let myPosts = posts ? posts.filter((post) => post.owner._id === user._id) : [];
  let myReels = reels ? reels.filter((reel) => reel.owner._id === user._id) : [];

  const [type, setType] = useState("post");
  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index === 0) return null;
    setIndex(index - 1);
  };
  const nextReel = () => {
    if (index === myReels.length - 1) return null;
    setIndex(index + 1);
  };

  const [followed, setFollowed] = useState(false);
  const { followUser } = UserData();

  const followHandler = () => {
    setFollowed(!followed);
    followUser(user._id, fetchUser);
  };

  const followers = user.followers;
  useEffect(() => {
    if (followers && followers.includes(loggedInUser._id)) setFollowed(true);
  }, [user]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);
      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    followData();
  }, [user]);

  const { onlineUsers } = SocketData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-900 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14 px-4">
          {show && (
            <Modal
              value={followersData}
              title={"Followers"}
              setShow={setShow}
            />
          )}
          {show1 && (
            <Modal
              value={followingsData}
              title={"Followings"}
              setShow={setShow1}
            />
          )}
          <div className="bg-gray-800 flex justify-between gap-4 p-4 rounded-lg shadow-lg max-w-md w-full">
            <div className="image flex flex-col justify-between mb-2 gap-4">
              <img
                src={user.profilePic.url}
                alt=""
                className="w-[140px] h-[140px] rounded-full border-4 border-gray-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="flex justify-center items-center text-white font-semibold text-lg">
                {user.name}
                {onlineUsers.includes(user._id) && (
                  <span className="ml-3 text-green-400 font-bold">Online</span>
                )}
              </p>
              <p className="text-gray-400 text-sm">{user.email}</p>
              <p className="text-gray-400 text-sm">{user.gender}</p>
              <p
                className="text-gray-400 text-sm cursor-pointer hover:text-white"
                onClick={() => setShow(true)}
              >
                {user.followers.length} followers
              </p>
              <p
                className="text-gray-400 text-sm cursor-pointer hover:text-white"
                onClick={() => setShow1(true)}
              >
                {user.followings.length} following
              </p>

              {user._id !== loggedInUser._id && (
                <button
                  onClick={followHandler}
                  className={`py-2 px-6 text-white rounded-full transition-all duration-300 ease-in-out transform ${
                    followed
                      ? "bg-gradient-to-r from-red-500 to-pink-600"
                      : "bg-gradient-to-r from-blue-500 to-blue-600"
                  } hover:scale-105 hover:shadow-lg`}
                >
                  {followed ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>

          <div className="controls flex justify-center items-center bg-gray-800 p-4 rounded-md gap-7">
            <button
              onClick={() => setType("post")}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Posts
            </button>
            <button
              onClick={() => setType("reel")}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Reels
            </button>
          </div>

          {type === "post" && (
            <>
              {myPosts && myPosts.length > 0 ? (
                myPosts.map((e) => <PostCard type={"post"} value={e} key={e._id} />)
              ) : (
                <p className="text-gray-400">No Posts Yet</p>
              )}
            </>
          )}

          {type === "reel" && (
            <>
              {myReels && myReels.length > 0 ? (
                <div className="flex gap-3 justify-center items-center">
                  <PostCard
                    type={"reel"}
                    value={myReels[index]}
                    key={myReels[index]._id}
                  />
                  <div className="button flex flex-col justify-center items-center gap-6">
                    {index > 0 && (
                      <button
                        className="bg-gray-600 text-white py-5 px-5 rounded-full"
                        onClick={prevReel}
                      >
                        <FaArrowUp />
                      </button>
                    )}
                    {index < myReels.length - 1 && (
                      <button
                        className="bg-gray-600 text-white py-5 px-5 rounded-full"
                        onClick={nextReel}
                      >
                        <FaArrowDownLong />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">No Reels Yet</p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserAccount;

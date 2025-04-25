// Account.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import Modal from "../components/Modal";
import axios from "axios";
import { Loading } from "../components/Loading";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { logoutUser, updateProfilePic, updateProfileName } = UserData();
  const { posts, reels, loading } = PostData();

  const [type, setType] = useState("post");
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [file, setFile] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const myPosts = posts?.filter((post) => post.owner._id === user._id);
  const myReels = reels?.filter((reel) => reel.owner._id === user._id);

  const logoutHandler = () => logoutUser(navigate);

  const prevReel = () => index > 0 && setIndex(index - 1);
  const nextReel = () => index < myReels.length - 1 && setIndex(index + 1);

  const changeFileHandler = (e) => setFile(e.target.files[0]);

  const changleImageHandler = () => {
    const formdata = new FormData();
    formdata.append("file", file);
    updateProfilePic(user._id, formdata, setFile);
  };

  const UpdateName = () => updateProfileName(user._id, name, setShowInput);

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${user._id}`, {
        oldPassword,
        newPassword,
      });
      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const followData = async () => {
      try {
        const { data } = await axios.get(`/api/user/followdata/${user._id}`);
        setFollowersData(data.followers);
        setFollowingsData(data.followings);
      } catch (error) {
        console.error(error);
      }
    };
    followData();
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {show && <Modal value={followersData} title="Followers" setShow={setShow} />}
      {show1 && <Modal value={followingsData} title="Followings" setShow={setShow1} />}

      <motion.div
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl shadow-2xl rounded-xl p-8 flex flex-col lg:flex-row gap-8 items-center justify-between"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.profilePic.url}
            alt="profile"
            className="rounded-full w-40 h-40 border-4 border-purple-500 shadow-xl"
          />
          <div className="flex flex-col items-center">
            <input type="file" onChange={changeFileHandler} className="text-sm" />
            <button
              onClick={changleImageHandler}
              className="mt-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white rounded-full transition-all duration-300"
            >
              Update Profile
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-white w-full lg:w-auto">
          {showInput ? (
            <div className="flex items-center gap-2">
              <input
                className="px-2 py-1 bg-white text-black rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
              />
              <button onClick={UpdateName} className="text-sm text-green-400">
                Save
              </button>
              <button onClick={() => setShowInput(false)} className="text-red-500 text-lg">
                ✕
              </button>
            </div>
          ) : (
            <p className="text-xl font-semibold">
              {user.name}{" "}
              <button onClick={() => setShowInput(true)}>
                <CiEdit className="inline text-purple-400" />
              </button>
            </p>
          )}
          <p>{user.email}</p>
          <p>{user.gender}</p>
          <p className="cursor-pointer hover:underline" onClick={() => setShow(true)}>
            {user.followers.length} Followers
          </p>
          <p className="cursor-pointer hover:underline" onClick={() => setShow1(true)}>
            {user.followings.length} Following
          </p>
          <button
            onClick={logoutHandler}
            className="mt-2 bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col items-center">
        <button
          onClick={() => setShowUpdatePass(!showUpdatePass)}
          className="bg-blue-500 px-4 py-1 rounded-full text-white mb-4 hover:bg-blue-600 transition"
        >
          {showUpdatePass ? "Cancel Password Update" : "Update Password"}
        </button>

        {showUpdatePass && (
          <form
            onSubmit={updatePassword}
            className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-md backdrop-blur-xl"
          >
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="bg-black/40 text-white px-4 py-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-black/40 text-white px-4 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
            >
              Update Password
            </button>
          </form>
        )}

        <div className="flex gap-4 mt-10 bg-white/10 px-6 py-3 rounded-full shadow-inner">
          <button
            onClick={() => setType("post")}
            className={`px-4 py-1 rounded-full ${
              type === "post" ? "bg-purple-700 text-white" : "bg-white/20"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setType("reel")}
            className={`px-4 py-1 rounded-full ${
              type === "reel" ? "bg-purple-700 text-white" : "bg-white/20"
            }`}
          >
            Reels
          </button>
        </div>

        <div className="mt-6 w-full flex flex-col items-center gap-4">
          {type === "post" ? (
            myPosts?.length > 0 ? (
              myPosts.map((e) => <PostCard key={e._id} value={e} type="post" />)
            ) : (
              <p>No Posts Yet</p>
            )
          ) : myReels?.length > 0 ? (
            <div className="flex items-center justify-center gap-6">
              <PostCard key={myReels[index]._id} value={myReels[index]} type="reel" />
              <div className="flex flex-col gap-4">
                {index > 0 && (
                  <button
                    className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-700"
                    onClick={prevReel}
                  >
                    <FaArrowUp />
                  </button>
                )}
                {index < myReels.length - 1 && (
                  <button
                    className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-700"
                    onClick={nextReel}
                  >
                    <FaArrowDownLong />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>No Reels Yet</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Account;

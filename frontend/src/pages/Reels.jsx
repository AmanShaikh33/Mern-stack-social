import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowUp, FaArrowDownLong } from "react-icons/fa6";
import { Loading } from "../components/Loading";

const Reels = () => {
  const { reels, loading } = PostData();
  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index === 0) return null;
    setIndex(index - 1);
  };

  const nextReel = () => {
    if (index === reels.length - 1) return null;
    setIndex(index + 1);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-[#1A202C] min-h-screen">
          <div className="glassmorphism-container p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <AddPost type="reel" />

            <div className="flex flex-col items-center gap-6 mt-8">
              {reels && reels.length > 0 ? (
                <PostCard
                  key={reels[index]._id}
                  value={reels[index]}
                  type={"reel"}
                />
              ) : (
                <p className="text-lg text-gray-600">No reels yet</p>
              )}

              <div className="flex justify-between w-full px-4 mt-6">
                {index > 0 && (
                  <button
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 px-6 rounded-full hover:scale-105 transform transition-all"
                    onClick={prevReel}
                  >
                    <FaArrowUp className="text-2xl" />
                  </button>
                )}
                {index < reels.length - 1 && (
                  <button
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 px-6 rounded-full hover:scale-105 transform transition-all"
                    onClick={nextReel}
                  >
                    <FaArrowDownLong className="text-2xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reels;

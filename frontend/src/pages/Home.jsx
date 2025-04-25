import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";

const Home = () => {
  const { posts, loading } = PostData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-[#1A202C] min-h-screen flex items-center justify-center py-8">
          <div className="w-full max-w-7xl p-8 space-y-8">
            <div className="flex justify-center">
              <AddPost type="post" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts && posts.length > 0 ? (
                posts.map((e) => (
                  <PostCard value={e} key={e._id} type={"post"} />
                ))
              ) : (
                <p className="text-white text-xl text-center">
                  No Post Yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

import React, { useState } from "react";
import { PostData } from "../context/PostContext";
import { LoadingAnimation } from "./Loading";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { addPost, addLoading } = PostData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("caption", caption);
    formdata.append("file", file);
    addPost(formdata, setFile, setCaption, setFilePrev, type);
  };

  return (
    <div className="bg-transparent flex items-center justify-center pt-3 pb-5">
      <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 items-center"
        >
          <input
            type="text"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            type="file"
            className="w-full p-3 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            accept={type === "post" ? "image/*" : "video/*"}
            onChange={changeFileHandler}
            required
          />
          {filePrev && (
            <>
              {type === "post" ? (
                <img
                  src={filePrev}
                  alt="Preview"
                  className="max-w-full h-auto rounded-md shadow-md"
                />
              ) : (
                <video
                  controlsList="nodownload"
                  controls
                  src={filePrev}
                  className="h-[300px] w-full rounded-md shadow-md"
                />
              )}
            </>
          )}
          <button
            disabled={addLoading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all disabled:bg-gray-400"
          >
            {addLoading ? <LoadingAnimation /> : "+ Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;

import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ value, title, setShow }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[350px] max-h-[80vh] overflow-y-auto relative glassmorphism-container">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">{title}</h1>
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 text-3xl hover:text-red-600 transition-all"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          {value && value.length > 0 ? (
            value.map((e, i) => (
              <Link
                key={i}
                className="bg-gradient-to-r from-blue-500 to-teal-500 py-3 px-4 text-white text-center rounded-lg flex justify-center items-center gap-4 transform hover:scale-105 transition-all"
                to={`/user/${e._id}`}
                onClick={() => setShow(false)}
              >
                <span className="text-xl font-medium">{i + 1}</span>
                <img
                  className="w-10 h-10 rounded-full border-2 border-white"
                  src={e.profilePic.url}
                  alt={`${e.name}'s profile`}
                />
                <span className="truncate">{e.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-gray-600 text-center mt-2">No {title} yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

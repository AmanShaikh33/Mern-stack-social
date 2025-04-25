import React from "react";

const Message = ({ ownMessage, message }) => {
  return (
    <div className={`mb-3 px-2 flex ${ownMessage ? "justify-end" : "justify-start"}`}>
      <span
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-md transition-all duration-300
        ${ownMessage
          ? "bg-blue-600 text-white rounded-br-none"
          : "bg-gray-700 text-gray-100 rounded-bl-none"
        }`}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;

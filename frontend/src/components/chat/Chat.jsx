import React from "react";
import { UserData } from "../../context/UserContext";
import { BsSendCheck } from "react-icons/bs";

const Chat = ({ chat, setSelectedChat, isOnline }) => {
  const { user: loggedInUser } = UserData();
  let user;
  if (chat) user = chat.users[0];

  return (
    <div>
      {user && (
        <div
          className="bg-[#1f2937] hover:bg-[#374151] transition-colors duration-200 py-3 px-4 rounded-xl cursor-pointer mt-3 shadow-md"
          onClick={() => setSelectedChat(chat)}
        >
          <div className="flex items-center gap-3 mb-2">
            {isOnline && (
              <div className="text-4xl font-bold text-green-400 leading-none">
                •
              </div>
            )}
            <img
              src={user.profilePic.url}
              alt=""
              className="w-10 h-10 rounded-full border border-gray-600 shadow-sm"
            />
            <span className="text-white font-medium text-sm">{user.name}</span>
          </div>

          <span className="flex items-center gap-2 text-gray-300 text-xs px-2">
            {loggedInUser._id === chat.latestMessage.sender && <BsSendCheck />}
            <span className="truncate">
              {chat.latestMessage.text.slice(0, 18)}...
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Chat;

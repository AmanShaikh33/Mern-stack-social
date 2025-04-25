import React, { useState } from "react";
import { ChatData } from "../../context/ChatContext";
import toast from "react-hot-toast";
import axios from "axios";

const MessageInput = ({ setMessages, selectedChat }) => {
  const [textMsg, setTextMsg] = useState("");
  const { setChats } = ChatData();

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/messages", {
        message: textMsg,
        recieverId: selectedChat.users[0]._id,
      });

      setMessages((message) => [...message, data]);
      setTextMsg("");
      setChats((prev) => {
        const updatedChat = prev.map((chat) => {
          if (chat._id === selectedChat._id) {
            return {
              ...chat,
              latestMessage: {
                text: textMsg,
                sender: data.sender,
              },
            };
          }

          return chat;
        });

        return updatedChat;
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleMessage}
      className="flex gap-3 items-center mt-2 px-2 py-2 bg-[#2a2a3b] rounded-lg"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 bg-[#1e1e2f] text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={textMsg}
        onChange={(e) => setTextMsg(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;

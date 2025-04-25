import React, { useEffect, useRef, useState } from "react";
import { UserData } from "../../context/UserContext";
import axios from "axios";
import { LoadingAnimation } from "../Loading";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { SocketData } from "../../context/SocketContext";

const MessageContainer = ({ selectedChat, setChats }) => {
  const [messages, setMessages] = useState([]);
  const { user } = UserData();
  const [loading, setLoading] = useState(false);
  const { socket } = SocketData();

  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (selectedChat._id === message.chatId) {
        setMessages((prev) => [...prev, message]);
      }

      setChats((prev) => {
        const updatedChat = prev.map((chat) => {
          if (chat._id === message.chatId) {
            return {
              ...chat,
              latestMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return chat;
        });
        return updatedChat;
      });
    });

    return () => socket.off("newMessage");
  }, [socket, selectedChat, setChats]);

  async function fetchMessages() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "/api/messages/" + selectedChat.users[0]._id
      );

      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-[#1e1e2f] rounded-xl shadow-lg p-4 text-white h-full">
      {selectedChat && (
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-gray-600 pb-2 mb-3">
            <img
              src={selectedChat.users[0].profilePic.url}
              className="w-9 h-9 rounded-full border-2 border-blue-500"
              alt=""
            />
            <span className="font-medium text-lg">
              {selectedChat.users[0].name}
            </span>
          </div>

          {/* Messages */}
          {loading ? (
            <LoadingAnimation />
          ) : (
            <>
              <div
                ref={messageContainerRef}
                className="flex flex-col gap-3 mb-4 h-[400px] overflow-y-auto p-3 rounded-lg bg-[#2a2a3b] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
              >
                {messages &&
                  messages.map((e, idx) => (
                    <Message
                      key={idx}
                      message={e.text}
                      ownMessage={e.sender === user._id}
                    />
                  ))}
              </div>

              {/* Input Field */}
              <MessageInput
                setMessages={setMessages}
                selectedChat={selectedChat}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageContainer;

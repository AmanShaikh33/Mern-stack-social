import React, { useEffect, useState } from "react";
import { ChatData } from "../context/ChatContext";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Chat from "../components/chat/Chat";
import MessageContainer from "../components/chat/MessageContainer";
import { SocketData } from "../context/SocketContext";

const ChatPage = ({ user }) => {
  const { createChat, selectedChat, setSelectedChat, chats, setChats } = ChatData();
  const { onlineUsers } = SocketData();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  // Fetch all users for search
  async function fetchAllUsers() {
    try {
      const { data } = await axios.get("/api/user/all?search=" + query);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Get existing chats
  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [query]);

  useEffect(() => {
    getAllChats();
  }, []);

  // Create new chat
  async function createNewChat(id) {
    await createChat(id);
    setSearch(false);
    getAllChats();
  }

  return (
    <div className="w-full md:w-[750px] md:p-4 p-2 bg-gradient-to-br from-gray-100 to-white shadow-xl rounded-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Side: User Search & Chat List */}
        <div className="w-full md:w-[30%] bg-white p-3 rounded-2xl shadow-lg">
          <div className="top flex flex-col gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-4 py-2 rounded-full shadow-md"
              onClick={() => setSearch(!search)}
            >
              {search ? "X" : <FaSearch />}
            </button>

            {search ? (
              <>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="users mt-2 space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {users && users.length > 0 ? (
                    users.map((e) => (
                      <div
                        key={e._id}
                        onClick={() => createNewChat(e._id)}
                        className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded-lg cursor-pointer flex items-center gap-3 shadow-sm"
                      >
                        <img
                          src={e.profilePic.url}
                          className="w-8 h-8 rounded-full border-2 border-white shadow"
                          alt=""
                        />
                        <span className="font-medium">{e.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No Users</p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center mt-4 gap-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {chats.map((e) => (
                  <Chat
                    key={e._id}
                    chat={e}
                    setSelectedChat={setSelectedChat}
                    isOnline={onlineUsers.includes(e.users[0]._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Messages */}
        {selectedChat === null ? (
          <div className="w-full md:w-[70%] flex items-center justify-center text-center p-8 text-xl font-semibold text-gray-600 bg-white rounded-2xl shadow-inner">
            👋 Hello {user.name}, select a chat to start a conversation!
          </div>
        ) : (
          <div className="w-full md:w-[70%] bg-white rounded-2xl shadow-lg overflow-hidden">
            <MessageContainer selectedChat={selectedChat} setChats={setChats} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserData } from "./UserContext";

const EndPoint = "https://mern-social-3e3m.onrender.com"; // backend URL
const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = UserData();

  useEffect(() => {
    if (!user?._id) return; // Wait until user data is available

    const socketInstance = io(EndPoint, {
      query: {
        userId: user._id,
      },
    });

    setSocket(socketInstance);

    socketInstance.on("getOnlineUser", (users) => {
      setOnlineUsers(users);
    });

    return () => socketInstance && socketInstance.disconnect();
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const SocketData = () => useContext(SocketContext);

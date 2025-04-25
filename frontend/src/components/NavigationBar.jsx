import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import {
  IoChatbubbleEllipses,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

const NavigationBar = () => {
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 py-1 bg-opacity-50">
      <div className="flex justify-around items-center px-6 py-1 rounded-lg shadow-lg">
        <Link
          to={"/"}
          onClick={() => setTab("/")}
          className={`flex flex-col items-center text-2xl transition-all ${
            tab === "/" ? "text-blue-500 bg-white p-2 rounded-full shadow-lg" : "text-gray-200 hover:text-blue-500"
          }`}
        >
          <span>{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to={"/reels"}
          onClick={() => setTab("/reels")}
          className={`flex flex-col items-center text-2xl transition-all ${
            tab === "/reels" ? "text-blue-500 bg-white p-2 rounded-full shadow-lg" : "text-gray-200 hover:text-blue-500"
          }`}
        >
          <span>
            {tab === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}
          </span>
          <span className="text-xs">Reels</span>
        </Link>
        <Link
          to={"/search"}
          onClick={() => setTab("/search")}
          className={`flex flex-col items-center text-2xl transition-all ${
            tab === "/search" ? "text-blue-500 bg-white p-2 rounded-full shadow-lg" : "text-gray-200 hover:text-blue-500"
          }`}
        >
          <span>
            {tab === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}
          </span>
          <span className="text-xs">Search</span>
        </Link>
        <Link
          to={"/chat"}
          onClick={() => setTab("/chat")}
          className={`flex flex-col items-center text-2xl transition-all ${
            tab === "/chat" ? "text-blue-500 bg-white p-2 rounded-full shadow-lg" : "text-gray-200 hover:text-blue-500"
          }`}
        >
          <span>
            {tab === "/chat" ? (
              <IoChatbubbleEllipses />
            ) : (
              <IoChatbubbleEllipsesOutline />
            )}
          </span>
          <span className="text-xs">Chat</span>
        </Link>
        <Link
          to={"/account"}
          onClick={() => setTab("/account")}
          className={`flex flex-col items-center text-2xl transition-all ${
            tab === "/account" ? "text-blue-500 bg-white p-2 rounded-full shadow-lg" : "text-gray-200 hover:text-blue-500"
          }`}
        >
          <span>
            {tab === "/account" ? (
              <RiAccountCircleFill />
            ) : (
              <RiAccountCircleLine />
            )}
          </span>
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;

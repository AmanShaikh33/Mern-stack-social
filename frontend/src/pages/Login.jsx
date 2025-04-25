import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading } = UserData();
  const { fetchPosts } = PostData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPosts);
  };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="bg-gradient-to-r from-[#1A202C] to-[#1E3A47] h-screen w-full flex justify-center items-center">
          <div className="w-[370px] lg:w-[430px] h-[610px] bg-gradient-to-r from-[#2D3748] to-[#4A5568] lg:translate-x-[420px] rounded-md flex flex-col items-center fixed">
            <div className="">
              <div className="text-xl cursor-pointer flex flex-col justify-center items-center ">
                <h1 className="text-3xl font-bold text-white mb-[30px] mt-[30px]">
                 HUDDLE
                </h1>
              </div>

              <form onSubmit={submitHandler}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                  <input
                    type="email"
                    className="w-[300px] lg:w-[340px] h-[43px] bg-transparent border border-[#14B8A6] rounded-sm p-4 text-white"
                    placeholder="User Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    
                  />
                  <input
                    type="password"
                    className="w-[300px] lg:w-[340px] h-[43px] bg-transparent border border-[#14B8A6] rounded-sm p-4 text-white"
                    placeholder="User Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center mt-7">
                  <button className="w-[300px] lg:w-[340px] h-[35px] bg-[#14B8A6] font-bold text-white text-[13px] rounded-sm">Login</button>
                </div>
              </form>
            </div>
            
            <div className="h-[1px] w-[300px] lg:w-[340px] bg-white mt-[50px] mb-[15px]"></div>

            
              <div className="text-white text-base font-semibold text-center mt-[10px] space-y-2 m-2">
                <h1 className="text-2xl lg:text-3xl">Don't Have Account?</h1>
                <h1>SIGN UP to HUDDLE</h1>
               
              </div>
              <Link
                  to="/register"
                  className="w-[300px] lg:w-[340px] h-[35px] bg-[#14B8A6] font-bold text-white text-[16px] rounded-sm text-center pt-[5px] mt-[30px]"
                >
                  SIGN UP
                </Link>
            </div>
          </div>
        
      )}
    </>
  );
};

export default Login;

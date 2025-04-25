import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { registerUser, loading } = UserData();

  const { fetchPosts } = PostData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("file", file);

    registerUser(formdata, navigate, fetchPosts);
  };
  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="bg-gradient-to-r from-[#1A202C] to-[#1E3A47] h-screen w-full flex justify-center items-center">
          <div className="w-[370px] lg:w-[430px] h-[610px] bg-gradient-to-r from-[#2D3748] to-[#4A5568] lg:translate-x-[420px] rounded-md flex flex-col items-center fixed">
            <div className="">
              <div className="text-xl cursor-pointer flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-white mb-[30px] mt-[30px]">
                  HUDDLE
                </h1>
              </div>

              <form onSubmit={submitHandler}>
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-3">
                  {filePrev && (
                    <img
                      src={filePrev}
                      className="w-[50px] h-[50px] rounded-full"
                      alt=""
                    />
                  )}
                  <input
                    type="file"
                    className="custom-input w-[300px] lg:w-[340px]"
                    onChange={changeFileHandler}
                    accept="image/*"
                    required
                  />
                  <input
                    type="text"
                    className="w-[300px] lg:w-[340px] h-[43px] bg-transparent border border-[#14B8A6] rounded-sm p-4 text-white"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
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
                  <select
                    className="w-[300px] lg:w-[340px] h-[35px] bg-[#14B8A6] font-bold text-white text-[13px] rounded-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="text-center mt-7">
                  <button className="w-[300px] lg:w-[340px] h-[35px] bg-[#14B8A6] font-bold text-white text-[13px] rounded-sm">Register</button>
                </div>

                
              </form>
              
            </div>

            <Link to="/login" className="w-[300px] lg:w-[340px] h-[40px] bg-[#14B8A6] font-bold text-white text-[16px] mt-[40px] rounded-md flex items-center justify-center">
            Already have an account? Login
          </Link>
              
            </div>
            
          </div>
       
      )}
    </>
  );
};

export default Register;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", value)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.data);
        localStorage.setItem("loggedIn", "true");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(value);
  };
  return (
    <div className=" w-[700px] h-auto px-10 py-5 rounded-lg bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="text-3xl font-semibold text-center mb-10"> Login</div>
        <div className="flex gap-10 items-center mb-10">
          <label htmlFor="email" className="flex-1">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="enter your Email"
            value={value.email}
            className="flex-[3] w-full h-[40px] bg-slate-200 px-5 rounded outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-10 items-center mb-10">
          <label htmlFor="password" className="flex-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="enter Password"
            value={value.password}
            className="flex-[3] w-full h-[40px] bg-slate-200 px-5 rounded outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-5 items-center">
          <button
            type="submit"
            className="text-lg text-white bg-teal-800 px-5 py-2 rounded-md"
          >
            Submit
          </button>
          <div className="text-sm text-gray-400">
            New User?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              register
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

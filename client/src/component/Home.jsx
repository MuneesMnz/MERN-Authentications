import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .post("http://localhost:5000/userdata", { token: token })
      .then((res) => {
        console.log(res.data);
        if(res.data.data==="token expired"){
          alert("token expired")
          localStorage.clear()
          navigate('/login')
        }
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className=" w-[400px] h-auto px-10 py-5 rounded-lg bg-white shadow-md text-center">
      <div className="text-3xl mb-5 font-semibold">{data?.uname}</div>
      <div className="text-xl mb-5">{data?.email}</div>
      <div>
        <button
          className="px-5 py-2 rounded bg-teal-800 text-white font-semibold text-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

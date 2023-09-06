import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import Home from "./component/Home";
import Register from "./component/Register";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return (
    <div className=" bg-teal-400 w-full h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={isLoggedIn==="true" ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Application from "./components/Application/Application.js";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import JobDetails from "./components/Job/JobDetails.js";
import Jobs from "./components/Job/Jobs";
import PostJob from "./components/Job/PostJob";
import { useAuth } from "./context/auth.js";
import "./App.css";
const App = () => {
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/v1/user/getuser");
        const data = await res.json();
        console.log(data.user);
        if (data.success === false) {
          console.log(data.message);
        }
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: data.user,
          isAuthorized: true,
        }));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
    // console.log(auth);
  }, [auth.isAuthorized]);
  useEffect(() => {
    console.log(auth);
  }, [auth.user]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/application/:id" element={<Application />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

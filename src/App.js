import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Application from "./components/Application/Application.js";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import Jobs from "./components/Job/Jobs";
import PostJob from "./components/Job/PostJob";
const App = () => {
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

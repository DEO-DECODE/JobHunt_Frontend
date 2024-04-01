import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Jobs = () => {
  const [auth, setAuth] = useAuth();
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await fetch("api/v1/job/getall");
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setJobs(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAllJobs();
  }, []);
  if (!auth.isAuthorized) {
    navigate("/");
  }
  return (
    <>
      <section className="jobs page">
        <div className="container">
          <h1>ALL AVAILABLE JOBS</h1>
          <div className="banner">
            {jobs &&
              jobs.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p>{element.title}</p>
                    <p>{element.category}</p>
                    <p>{element.country}</p>
                    <Link to={`/job/${element._id}`}>Job Details</Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;

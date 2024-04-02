import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
const PostJob = () => {
  const [title, serTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    try {
      const res = await fetch("/api/v1/job/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:
          fixedSalary.length >= 4
            ? JSON.stringify({
                title,
                description,
                category,
                country,
                city,
                location,
                fixedSalary,
              })
            : JSON.stringify({
                title,
                description,
                category,
                country,
                city,
                location,
                salaryFrom,
                salaryTo,
              }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!auth.isAuthorized || (auth.user && auth.user.role !== "Employer")) {
    navigate("/");
  }
  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW JOB</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => serTitle(e.target.value)}
                placeholder="Job Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <option value="">Select Category</option>
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="Frontend Web Development">
              Frontend Web Development
            </option>
            <option value="MERN Stack Development">
              MERN STACK Development
            </option>
            <option value="Account & Finance">Account & Finance</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Video Animation">Video Animation</option>
            <option value="MEAN Stack Development">
              MEAN STACK Development
            </option>
            <option value="MEVN Stack Development">
              MEVN STACK Development
            </option>
            <option value="Data Entry Operator">Data Entry Operator</option>
            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;

import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from "react-redux";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const data = useSelector((state) => state.auth);
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !name || !password || !gender)
      toast.error('Fill out all inputs', {theme: "dark", autoClose: 2000, hideProgressBar: true})
    else if(name.length < 3 || name.length > 50)
      toast.error('Name must be 3-50 characters', {theme: "dark", autoClose: 2000, hideProgressBar: true})
    else if(password.length < 6 || password.length > 30)
      toast.error('Password must be 6-30 characters', {theme: "dark", autoClose: 2000, hideProgressBar: true})
    else {
      axios.post('http://localhost:3000/api/v1/signup', {
        email,
        name,
        password,
        gender
      })
      .then(function(response) {
        console.log(response.data);
        toast.success('Account created', {theme: "dark", autoClose: 2000, hideProgressBar: true})
      })
      .catch(function(error) {
        console.error('Error:', error);
        toast.error('Signup failed', {theme: "dark", autoClose: 2000, hideProgressBar: true});
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-[360px] h-[400px] outline outline-1 outline-customBlack items-center justify-center rounded-lg">
        <div className="flex flex-col gap-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-[300px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex gap-2 mb-8 ml-1">
            <p>Male</p>
            <input
              type="radio"
              name="radio-2"
              className="radio radio-primary mr-12"
              onClick={() => setGender('male')}
            />
            <p>Female</p>
            <input
              type="radio"
              name="radio-2"
              className="radio radio-primary"
              onClick={() => setGender('female')}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div className="flex items-center justify-center">
            <span className="text-sm">Already registered?</span>
            <Link 
              to={"/login"}
              className="ml-2 underline text-primary text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

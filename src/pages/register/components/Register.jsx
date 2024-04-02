import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { object, string } from 'yup';
import { NavLink, useNavigate } from "react-router-dom";
import './register.css';

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };

  const ValidationData = async () => {
    const RegisterSchema = object({
      userName: string().min(6, "name at least 6 characters").max(20).required("Please enter your name"),
      email: string().email("please enter valid email"),
      password: string().min(8).max(20).required("Please enter your password"),
      image: string().required("Please select your image"),
    });
    try {
      await RegisterSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      if (error.name === "ValidationError") {
        const yupErrors = {};
        error.inner.forEach((err) => {
          yupErrors[err.path] = err.message;
        });
        setErrors(yupErrors);
      }
      setLoader(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await ValidationData()) {
      const formatData = new FormData();
      formatData.append("userName", user.userName);
      formatData.append("email", user.email);
      formatData.append("password", user.password);
      formatData.append("image", user.image);
      try {
        const { data } = await axios.post(
          `https://ecommerce-node4-five.vercel.app/auth/signup`,
          formatData
        );
        setUser({
          userName: "",
          email: "",
          password: "",
          image: "",
        });
        if (data.message === "success") {
          toast.success("Account  created successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
          navigate("/signin");
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(error.response.data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
        }
      } finally {
        setErrors([]);
        setLoader(false);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="signup-fields">
            <input
              type="text"
              value={user.userName}
              id="userName"
              name="userName"
              onChange={handleChange}
              placeholder='your name'
            />
            <p>{errors.userName}</p>
            <input
              type="email"
              value={user.email}
              id="email"
              name="email"
              onChange={handleChange}
              placeholder='Your Email'
            />
            <p>{errors.email}</p>
            <input
              type="password"
              value={user.password}
              id="password"
              name="password"
              onChange={handleChange}
              placeholder='password'
            />
            <p>{errors.password}</p>
            <input type="file" name="image" onChange={handleImageChange} />
            <p>{errors.image}</p>
          </div>
          <button>continue</button>
          <p className="signup-login">Already have an account? <Link to={"/pages/login/components/Login"}>log in here </Link></p>
          <div className="signup-agree">
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;







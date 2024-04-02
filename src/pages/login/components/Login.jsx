import { useContext, useState } from "react";
import axios from "axios";
import { object, string } from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

export default function Login() {

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const ValidationData = async () => {
    let userSchema = object({
      email: string().email().required("Please enter your email correct"),
      password: string().required("Please enter your password correct"),
    });
    try {
      await userSchema.validate(user, { abortEarly: false });
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
      try {
        const { data } = await axios.post(
          `https://ecommerce-node4-five.vercel.app/auth/signin`,
          user
        );
        setUser({
          email: "",
          password: "",
        });
        if (data.message == "success") {
          toast.success("Login Is successfully!", {
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
          localStorage.setItem("userToken", data.token);
          setUserToken(data.token);
          navigate("/");
          
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'An error occurred', {
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
     
    }
  };
  return (

     
     <div className="LOG IN">
      <div className="signup-container">
        <h1>LOG IN</h1>
        <form onSubmit={handleSubmit}>
          <div className="signup-fields">
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
      
          </div>
              

                <NavLink to="/sendcode" className="text-primary align-self-end">Forget Password?</NavLink>

                <button>continue</button>
        
       
        </form>
      </div>
    </div>
    );
}


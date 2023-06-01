import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Manufacturer from "../components/Dashboard/Manufacturer";
import Transporter from "../components/Dashboard/Transporter";
import { useDispatch, useSelector } from "react-redux";
import '../scss/home.scss'
import { logoutUser } from "../store/user/user.action";

const Home = () => {
  

  const isAuth = localStorage.getItem("isAuth");
  const parsedIsAuth = isAuth ? JSON.parse(isAuth) : false;

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  

  useEffect(() => {
    if (!parsedIsAuth) {
      toast.warning("Please Login First");
      navigate("/login");
    }
  }, []);

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isAuth")
    localStorage.removeItem("user")
    dispatch(logoutUser())
    toast.success("Logout Successful")
    navigate('/login')
  }


  return (
    <div className="home">
      <div className="homeHead">
        <h2>Welcome, {parsedUser.username}</h2>
         <button onClick={handleLogout}>Logout</button>
      </div>
      {parsedUser.role === "Manufacturer" ? <Manufacturer /> : <Transporter />}
      
    </div>
  );
};

export default Home;

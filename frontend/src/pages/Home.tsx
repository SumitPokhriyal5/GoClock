import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Manufacturer from "../components/Dashboard/Manufacturer";
import Transporter from "../components/Dashboard/Transporter";
import { useDispatch } from "react-redux";
import '../scss/home.scss'
import { logoutUser } from "../store/user/user.action";

const Home = () => {
  const [load , setLoad] = useState(false)
  const [token , setToken] = useState("")

  const isAuth = localStorage.getItem("isAuth");
  const parsedIsAuth = isAuth ? JSON.parse(isAuth) : false;

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  

  useEffect(() => {
    const curToken = localStorage.getItem("token");
    const parsedToken = curToken ? JSON.parse(curToken) : "";
    setToken(parsedToken);
    if (!parsedIsAuth) {
      toast.warning("Please Login First");
      navigate("/login");
    }
  }, []);

  // handle logout
  const handleLogout = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isAuth")
    localStorage.removeItem("user")
    setLoad(true)
    await dispatch(logoutUser())
    setLoad(false)
    toast.success("Logout Successful")
    navigate('/login')
  }


  return (
    <div className="home">
      <div className="homeHead">
        <h2>Welcome, {parsedUser.username}</h2>
         <button onClick={handleLogout} className={load ? "loading" : ""}>{load ? "Loading.." : "Logout"}</button>
      </div>
      {parsedUser.role === "Manufacturer" ? <Manufacturer token = {token} /> : <Transporter token = {token} />}
      
    </div>
  );
};

export default Home;

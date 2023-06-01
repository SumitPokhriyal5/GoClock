import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Manufacturer from "../components/Dashboard/Manufacturer";
import Transporter from "../components/Dashboard/Transporter";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import '../scss/home.scss'
import { getMessageApi } from "../utils/api";
import { logoutUser } from "../store/user/user.action";

const Home = () => {
  const { messages, loading, error } = useSelector(
    (state: RootState) => state.messages
  );
   
  

  const isAuth = localStorage.getItem("isAuth");
  const parsedIsAuth = isAuth ? JSON.parse(isAuth) : false;

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getMessageApi())
  },[messages])

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
      <div className="messages">
      <h3>Messages:</h3>
      {messages?.length > 0 ? (
        <div className="message-container">
          {messages.map((message) => (
            <div className="message-row" key={message.orderID}>
              <p><span>Order ID:</span> {message.orderID}</p>
              <p><span>To:</span> {message.to}</p>
              <p><span>From:</span> {message.from}</p>
              <p><span>Quantity:</span> {message.quantity}</p>
              <p><span>Address:</span> {message.address}</p>
              <p><span>Transporter:</span> {message.transporter}</p>
              <p><span>Payment:</span>{message.sent ? `Done (${message.price})` : "Not Done"}</p>
            </div>
          ))}
           
        </div>
      ) : (
        <p>No Messages Found</p>
      )}
      </div>
    </div>
  );
};

export default Home;

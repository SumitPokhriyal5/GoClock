import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import '../../scss/auth.scss'
import { IUserRegister } from "../../types/user.types";
import { postMessageApi } from "../../utils/api";
import { IMessages } from "../../types/messages.types";

const Manufacturer: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [transporter, setTransporter] = useState("");
  const [allUsers , setAllUsers] = useState<IUserRegister[]>([])
  const { loading, error } = useSelector(
    (state: RootState) => state.messages
  );

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_URL}/user`).then((res) => res.json()).then((res) => setAllUsers(res.allUsers)).catch((err) => console.log(err));
  }, []);

  const handleSendMessage = () => {
    const messageData : IMessages = {
      to,
      from,
      quantity,
      transporter,
    };
    dispatch(postMessageApi(messageData))
    setTo("");
    setFrom("");
    setQuantity(1);
    setTransporter("");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredUser = allUsers.filter((el) => el.role !== "Manufacturer")
  return (
    <div className="manufacture">
      <form>
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="from">From:</label>
          <input
            type="text"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            
            <option value="1">1 ton</option>
            <option value="2">2 tons</option>
            <option value="3">3 tons</option>
          </select>
        </div>
        <div>
          <label htmlFor="transporter">Transporter:</label>
          <select
            id="transporter"
            value={transporter}
            onChange={(e) => setTransporter(e.target.value)}
          >
            <option value="">Select transporter</option>
            {filteredUser?.map((el) => (
              <option key={el.username} value={el.username}>{el.username}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleSendMessage}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Manufacturer
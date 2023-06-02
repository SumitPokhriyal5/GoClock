import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "../../scss/auth.scss";
import { IUserRegister } from "../../types/user.types";
import { getMessageApi, postMessageApi } from "../../utils/api";
import { IMessages } from "../../types/messages.types";
import { toast } from "react-toastify";

interface ManufacturerProps {
  token: string;
}

const Manufacturer: React.FC<ManufacturerProps> = ({ token }) => {
  const dispatch = useDispatch<any>();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [user, setUser] = useState<any>({});
  const [quantity, setQuantity] = useState(1);
  const [load, setLoad] = useState(false);
  const [transporter, setTransporter] = useState("");
  const [allUsers, setAllUsers] = useState<IUserRegister[]>([]);
  const { messages } = useSelector((state: RootState) => state.messages);
  const [searchOrderID, setSearchOrderID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const curUser = localStorage.getItem("user");
    const parsedUser = curUser ? JSON.parse(curUser) : {};
    setUser(parsedUser);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_URL}/user`)
      .then((res) => res.json())
      .then((res) => setAllUsers(res.allUsers))
      .catch((err) => console.log(err));
  }, []);

  const handleSendMessage = async () => {
    const messageData: IMessages = {
      to,
      from,
      quantity,
      transporter,
    };
    setLoad(true);
    await dispatch(postMessageApi(messageData, token));
    setLoad(false);
    toast.success("Message Added")
    setTo("");
    setFrom("");
    setQuantity(1);
    setTransporter("");
  };

  useEffect(() => {
    dispatch(getMessageApi(token));
  }, [messages]);

  const filteredUser = allUsers?.filter((el) => el.role !== "Manufacturer");
  const filteredMessages = messages?.filter(
    (el: IMessages) =>
      el.userID === user?._id &&
      el.orderID?.toLowerCase().includes(searchOrderID.toLowerCase()) // Filter by orderID
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedMessages = filteredMessages?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
              <option key={el.username} value={el.username}>
                {el.username}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleSendMessage}
          className={load ? "loading" : ""}
        >
          {load ? "Loading.." : "Send Message"}
        </button>
      </form>
      <div className="messages">
        <h3>Messages:</h3>
        <div className="search-by-orderID">
          <label htmlFor="orderID">Search by Order ID:</label>
          <input
            type="text"
            id="orderID"
            value={searchOrderID}
            onChange={(e) => setSearchOrderID(e.target.value)}
          />
        </div>
        {paginatedMessages?.length > 0 ? (
          <div className="message-container">
            {paginatedMessages.map((message) => (
              <div className="message-row" key={message.orderID}>
                <p>
                  <span>Order ID: </span> {message.orderID}
                </p>
                <p>
                  <span>To: </span> {message.to}
                </p>
                <p>
                  <span>From: </span> {message.from}
                </p>
                <p>
                  <span>Quantity: </span> {message.quantity}
                </p>
                <p>
                  <span>Address: </span> {message.address}
                </p>
                <p>
                  <span>Transporter: </span> {message.transporter}
                </p>
                <p>
                  <span>Payment: </span>
                  {message.sent ? `Done (${message.price}$)` : "Pending"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Messages Found</p>
        )}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= filteredMessages?.length}
          >
            {" "}
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;



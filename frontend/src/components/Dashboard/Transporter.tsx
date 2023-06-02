
import { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getMessageApi, paymentMessageApi } from "../../utils/api";
import { IMessages } from "../../types/messages.types";
import { toast } from "react-toastify";

const Transporter: FC<{ token: string }> = ({ token }) => {
  const [amount, setAmount] = useState(0);
  const [load, setLoad] = useState(false);
  const [searchOrderID, setSearchOrderID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(4);

  const { messages } = useSelector((state: RootState) => state.messages);

  const dispatch = useDispatch<any>();

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};

  useEffect(() => {
    dispatch(getMessageApi(token));
  }, [messages]);

  const filterMessages = messages?.filter(
    (el: IMessages) => el.transporter === parsedUser.username
  );

  // Search messages by Order ID
  const filteredMessages = filterMessages?.filter((el) =>
    el.orderID?.toLowerCase().includes(searchOrderID.toLowerCase())
  );

  // Pagination
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages?.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePayment = async (id: any) => {
    setLoad(true);
    await dispatch(paymentMessageApi(amount, id, token));
    setLoad(false);
    toast.success("Payment done Successfully");
  };

  return (
    <div className="transporter">
      <div className="messages">
        <div className="search-by-orderID">
          <label htmlFor="searchOrderID">Search by Order ID:</label>
          <input
            type="text"
            id="searchOrderID"
            value={searchOrderID}
            onChange={(e) => setSearchOrderID(e.target.value)}
          />
        </div>
        <h2>Messages:</h2>
        {currentMessages?.length > 0 ? (
          <div className="message-container">
            {currentMessages?.map((el) => (
              <div className="message-row" key={el._id}>
                <p>
                  <span>Order ID:</span> {el.orderID}
                </p>
                <p>
                  <span>To:</span> {el.to}
                </p>
                <p>
                  <span>From:</span> {el.from}
                </p>
                <p>
                  <span>Quantity:</span> {el.quantity}
                </p>
                <p>
                  <span>Address:</span> {el.address}
                </p>
                {el.sent ? (
                  <div>Payment Done ✔</div>
                ) : (
                  <div>
                    <input
                      type="number"
                      placeholder="payment amount"
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <button
                      onClick={() => handlePayment(el._id)}
                      className={load ? "loading" : ""}
                    >
                      {load ? "Wait" : "Send"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No Messages Found</p>
        )}
        {/* Pagination */}
        {filteredMessages && filteredMessages.length > messagesPerPage && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              disabled={indexOfLastMessage >= filteredMessages.length}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transporter;

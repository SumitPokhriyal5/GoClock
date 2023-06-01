import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getMessageApi, paymentMessageApi } from "../../utils/api";
import { IMessages } from "../../types/messages.types";

const Transporter = () => {
  const [amount , setAmount] = useState(0);
  const { messages, loading, error } = useSelector(
    (state: RootState) => state.messages
  );

  const dispatch = useDispatch<any>();

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};

  useEffect(() => {
    dispatch(getMessageApi());
  }, [messages]);

  const filterMessages = messages?.filter(
    (el: IMessages) => el.transporter === parsedUser.username
  );

  const handlePayment = (id: any) => {
    console.log(id)
    dispatch(paymentMessageApi(amount, id));
  };

  return (
    <div className="transporter">
      <div className="messages">
        <h2>Messages:</h2>
        <div className="message-container">
          {filterMessages?.map((el) => (
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
                <div>Payment Done</div>
              ) : (
                <div>
                  <input
                    type="number"
                    placeholder="payment amount"
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <button onClick={() => handlePayment(el._id)}>send</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transporter;

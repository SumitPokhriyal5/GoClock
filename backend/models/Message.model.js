const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  userID: String,
  orderID: String,
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  transporter: {
    type: String,
    required: true,
  },
  price: Number,
  sent: Boolean
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomNumber: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  users: [{
      type: String
  }]
});

const Room = mongoose.model("Room", roomSchema);


module.exports = Room;
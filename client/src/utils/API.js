import axios from "axios";

export default {
  // gets all users who are online
  getUsers: function() {
    return axios.get("/api/users");
  },
  // gets a specific user
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
    // Saves a user to the database
  signUp: function(userData) {
    return axios.post("/api/signup/", userData);
  },
  // Logs a user in
  logIn: function(loginData) {
    return axios.post("/api/login/", loginData);
  },
  // Logs a user out
  logOut: function(id) {
    return axios.get("/api/logout/", id);
  },
  saveRoom: function(roomData) {
    return axios.post("/api/rooms", roomData);
  },
  getRoom: function(id) {
    return axios.get("/api/rooms/" + id);
  },
}
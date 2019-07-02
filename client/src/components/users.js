import React, { Component } from "react";
import io from "socket.io-client";
import API from "../utils/API";

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            user: {},
            room: [],
            roomNumber: "",
            leavingUser: "",
            joiningUser: "",
            fullRoom: ""
        };

        // initiate socket
        this.socket = io("http://localhost:3001/");

        // socket connect/disconnect events
        this.socket.on('connect', () => {
            let id = this.socket.io.engine.id;
            console.log(id);
        });

        this.socket.on('disconnect', () => {
            this.logOut();
        });

        // socket receive events from server
        this.socket.on("RECEIVE_USER", data => {
            if (data) {
                this.setState({ joiningUser: data.user.username });
                this.loadUsers();
                console.log("firing");
            }
            clearTimeout(this.userjoinTimeout);
            this.userJoinTimeout = setTimeout(this.userJoiningTimeout, 4000);
        });

        this.socket.on("RECEIVE_USER_LEFT", data => {
            if (data) {
                this.setState({ leavingUser: data.user.username });
            }
            clearTimeout(this.userLeftTimeout);
            this.userLeftTimeout = setTimeout(this.userLeavingTimeout, 4000);
        });

        this.socket.on("RECEIVE_ROOM_NUMBER", data => {
            if (data) {
                console.log(data.users);
                this.setState({ room: data.users });
                this.setState({ roomNumber: data.roomNumber });
            }
            if (this.state.room.length === 2) {
                    API.saveRoom({
                        roomNumber: this.state.roomNumber,
                        users: this.state.room
                    });
                    this.setState({ fullRoom: "yes" });
            }

        });
    };

    // API calls
    loadUser = () => {
        API.getUser()
            .then(res =>
                this.setState({ user: res.data }))
            .catch(err => console.log(err))
    };

    logOut = () => {
        this.sendUserLeft();
        API.logOut(this.state.user._id)
            .then(res => window.location = "/login")
            .catch(err => console.log(err))
    };

    loadUsers = () => {
        API.getUsers()
            .then(res =>
                this.setState({ users: res.data }))
            .catch(err => console.log(err))
    };

    // socket send events
    sendUser = () => {
        this.socket.emit("SEND_USER", {
            user: this.state.user
        });

        this.socket.emit("SEND_ROOM_NUMBER", {
            user: this.state.user,
            users: this.state.users,
            roomNumber: this.state.roomNumber
        });
    };

    sendUserLeft = () => {
        this.socket.emit("SEND_USER_LEFT", {
            user: this.state.user,
            roomNumber: this.state.roomNumber
        });
    };

    // event timeouts
    userLeavingTimeout = () => {
        this.setState({ leavingUser: '' })
    };

    userJoiningTimeout = () => {
        this.setState({ joiningUser: '' })
    };

    componentDidMount() {
        this.loadUsers();
        this.loadUser();
        this.handleSendUserTimeout = setTimeout(this.sendUser, 5000);
    };

    componentWillUnmount() {
        clearTimeout(this.userLeftTimeout);
        clearTimeout(this.handleSendUserTimeout);
    };

    render() {

        const tableView = this.state.fullRoom && 
        <div className="users flex-fill text-center">
            <div className="inside">
                <h6><span className="fa-layers fa-fw"><i className="fas fa-users"></i><span className="fa-layers-counter" style={{ fontSize: 25 }}>{this.state.room.length}</span></span>&nbsp;Table #{this.state.roomNumber}</h6>
                {this.state.room.map(room => (
                    <div key={room.username}>
                        <div className="card-header">
                            <div className="userValue" style={{ color: `${room.colorSeed}` }}>
                                <img className="img-fluid" alt="" src={room.avatarURL}></img>&nbsp;{room.username}
                                <h6>${room.careerEarnings}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        const usersView = this.state.users.length && 
        <div className="users flex-fill text-center">
            <div className="inside">
                <h6><span className="fa-layers fa-fw"><i className="fas fa-users"></i><span className="fa-layers-counter" style={{ fontSize: 25 }}>{this.state.users.length}</span></span> Online Now</h6>
                {this.state.users.map(user => (
                    <div key={user._id}>
                        <div className="card-header">
                            <div className="userValue" style={{ color: `${user.colorSeed}` }}>
                                <img className="img-fluid" alt="" src={user.avatarURL}></img>&nbsp;{user.username}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        return (
            <div>
                {usersView}
                {tableView}    
            <button onClick={this.logOut} className="btn btn-danger btn-lg">Logout</button>
            </div>
        );
    };
};

export default Users;
import React, { Component } from "react";
import io from "socket.io-client";
import Sound from "react-sound";
import API from "../utils/API";
import Title from "./title";

class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: [],
            room: [],
            roomNumber: "",
            leavingUser: "",
            joiningUser: "",
        }

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
                this.setState({ room: [...this.state.room, data.user] });
                console.log("firing");
            }
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
                this.setState({ roomNumber: data.roomNumber });
            }
        });

    };

    // socket send events
    sendUser = () => {
        this.socket.emit("SEND_USER", {
            user: this.state.user,
            roomNumber: this.state.roomNumber
        });
    };

    sendRoom = () => {
        this.socket.emit("SEND_ROOM_NUMBER", {
            roomNumber: this.state.roomNumber
        });
    };

    sendUserLeft = () => {
        this.socket.emit("SEND_USER_LEFT", {
            user: this.state.user,
            roomNumber: this.state.roomNumber
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
        API.logOut()
        .then(res => window.location = "/login")
        .catch(err => console.log(err))
    };

    // event timeouts
    userLeavingTimeout = () => {
        this.setState({ leavingUser: '' })
    };

    // lifecycle methods
    componentDidMount() {
        this.sendRoom();
        this.loadUser();
        this.handleSendUserTimeout = setTimeout(this.sendUser, 8000);  
    };

    componentWillUnmount() {
        clearTimeout(this.handleSendUserTimeout);
        clearTimeout(this.userLeftTimeout);
    };

    // render method
    render() {
        return (
            <div>
                <Title />
                {this.state.room.length ? (
                    <div className="users flex-fill text-center">
                        <div className="inside">
                        <h6><span className="fa-layers fa-fw"><i className="fas fa-users"></i><span className="fa-layers-counter" style={{ fontSize: 25 }}>{this.state.room.length}</span></span>At This Table</h6>
                        {this.state.room.map(room => (
                            <div key={room._id}>
                                <div className="card-header">
                                    <div className="userValue" style={{ color: `${room.colorSeed}` }}>
                                        <img className="img-fluid" alt="" src={room.avatarURL}></img>&nbsp;{room.username}
                                        <br />
                                        <p>${room.careerEarnings}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                ) : (
                        <Sound
                            url="welcome.wav"
                            playStatus={Sound.status.PLAYING}
                            playbackRate={.75}
                        />
                    )}
            </div>
        );
    };
};

export default Room;

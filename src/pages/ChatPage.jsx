import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../reducers/allUsersSlice";
import { useNavigate } from "react-router";
import UsersListComponent from "../components/UsersLisComponent";

const ChatPage = ({ socket, conectedUsers, messages }) => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => {
    return state.allUsers;
  });
  const user = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("joinRoom", room);
      setJoinedRoom(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "" && joinedRoom) {
      socket.emit("chatMessage", { room, message, user: socket.id });
      setMessage("");
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  function navColb(id) {
    navigate(`/oneuser/${id}`);
  }

  return (
    <div className="flex flex-row">
      {/* <div>
        <button
          onClick={async () => {
            console.log(user);
          }}
          className="btn btn-active"
        >
          Spausti
        </button>

        {!joinedRoom ? (
          <div>
            <h2>Join a Room</h2>
            <input
              type="text"
              placeholder="Room Name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom} className="btn btn-active">
              Join Room
            </button>
          </div>
        ) : (
          <div>
            <h2>Room: {room}</h2>
            <div>
              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>
                    <strong>{msg.user}</strong>: {msg.message}
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={sendMessage}>
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-active">
                Send
              </button>
            </form>
          </div>
        )}
      </div> */}
      <div className="p-3 flex flex-col gap-3">
        <div>
          <UsersListComponent colb={navColb} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../reducers/allUsersSlice";
import { useNavigate } from "react-router";
// const socket = io("http://localhost:5004"); // Adjust this if your server is on a different port

const ChatPage = ({ socket, conectedUsers, messages }) => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);
  //   const [username, setUsername] = useState("");
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

  return (
    <div className="flex flex-row">
      <div>
        <button
          onClick={async () => {
            // console.log(await dispatch(getAllUsers()));
            console.log(user);
          }}
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
            <button onClick={joinRoom}>Join Room</button>
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
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-3">
        {/* {conectedUsers.length &&
          conectedUsers.map((cur) => {
            return (
              <div className="flex flex-row items-center gap-2 bg-slate-100">
                <div className="avatar">
                  <div className="w-12 border rounded-full">
                    <img alt="user" src={cur.avatar} />
                  </div>
                </div>
                <span>{cur.username}</span>
              </div>
            );
          })} */}
        {allUsers.allUsers.length &&
          allUsers.allUsers.map((cur) => {
            if (cur._id !== user.user.id) {
              // console.log(cur);
              return (
                <div
                  className="flex flex-row items-center gap-2 bg-slate-100"
                  onClick={() => navigate(`/oneuser/${cur._id}`)}
                  key={cur._id}
                >
                  <div
                    className={
                      cur.isOnline ? "avatar online" : "avatar  offline"
                    }
                  >
                    <div className="w-12 rounded-full">
                      <img src={cur.photo} />
                    </div>
                  </div>
                  <span>{cur.name}</span>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default ChatPage;

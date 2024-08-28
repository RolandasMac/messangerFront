import React, { useRef } from "react";
import { useSelector } from "react-redux";

const MessageList = ({ messages, convId, socket }) => {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const oneConv = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const messageRef = useRef();
  function sendMessage() {
    // alert(oneConv._id + " " + user.id);

    const message = messageRef.current.value;
    if (message !== "") {
      socket.emit("chatMessage", {
        userId: user.id,
        message,
        toConv: oneConv._id,
      });
      messageRef.current.value = "";
    }
  }

  return (
    <div>
      <div>
        <input ref={messageRef} type="text" placeholder="Rašykite žinutę" />
        <button onClick={sendMessage}>Siųsti</button>
      </div>
      <ul>
        {messages &&
          messages.toReversed().map((message, index) => (
            <li
              key={index}
              className={
                user.id === message.ownerId
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={message.owner.photo}
                  />
                </div>
              </div>
              <div className="chat-header">
                {message.owner.name}
                <time className="text-xs opacity-50">
                  {new Date(message.createdAt).toLocaleString()}
                </time>
              </div>
              <div className="chat-bubble">{message.message}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MessageList;

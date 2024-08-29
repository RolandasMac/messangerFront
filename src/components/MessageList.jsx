import React, { useRef, useEffect } from "react";
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
  // const messagesEndRef = useRef(null);
  // Scroll to the bottom when new messages are added
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);
  return (
    <div className="flex flex-col h-full max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Chat Room</h2>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            ref={messageRef}
            type="text"
            placeholder="Rašykite žinutę"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 btn btn-active"
          >
            Siųsti
          </button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages &&
          messages.toReversed().map((message, index) => (
            <div
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
            </div>
          ))}
        {/* <div ref={messagesEndRef} /> */}
      </div>
    </div>
  );
};

export default MessageList;

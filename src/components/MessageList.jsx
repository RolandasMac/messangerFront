import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListComponent from "../components/UsersLisComponent";
import { addNewParticipant } from "../reducers/conversations/convListSlice";
import LikeButton from "./LikeButton";
const MessageList = ({ messages, convId, socket }) => {
  const user = useSelector((state) => {
    return state.user;
  });
  const oneConv = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const messageRef = useRef();
  const dispatch = useDispatch();

  function sendMessage() {
    // alert(oneConv._id + " " + user.id);

    const message = messageRef.current.value;
    if (message !== "") {
      socket.emit("chatMessage", {
        userId: user.user.id,
        message,
        toConv: oneConv._id,
      });
      messageRef.current.value = "";
    }
  }
  function handleClick(id) {
    // alert(id + " " + oneConv._id);
    dispatch(addNewParticipant({ userId: id, convId: oneConv._id }));
  }

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b border-gray-200 flex flex-row justify-end">
        {/* <h2 className="text-xl font-semibold">Susirašinėjumų platforma</h2> */}
        <button
          className="btn "
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Pridėti pokalbio dalyvį
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Spauskite ant norimo pridėti vartotojo kortelės
            </h3>
            <UsersListComponent colb={handleClick} />
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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
      {/* <div>{messages.length}</div> */}
      <div className="flex-1 p-4 overflow-y-auto">
        {user.logged &&
          messages.length > 0 &&
          // false &&
          messages.toReversed().map((message, index) => (
            // {
            //   <span>{message.owner.}</span>
            //   console.log(message)
            // }
            <div
              key={index}
              className={
                user.user.id === message.ownerId
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={message.owner ? message.owner.photo : ""}
                  />
                </div>
              </div>
              <div className="chat-header">
                {message.owner.name ? message.owner.name + "  " : ""}
                <time className="text-xs opacity-50">
                  {new Date(message.createdAt).toLocaleString()}
                </time>
              </div>
              {/* <button onClick={() => alert(message._id + " " + user.user.id)}>
                Like
              </button> */}
              <LikeButton
                conversationId={oneConv._id}
                messageId={message._id}
                userId={message.ownerId}
                msglikes={message.likes}
              />
              <div className="chat-bubble">
                {message.message ? message.message : ""}
              </div>
              {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
          ))}
        {/* <div ref={messagesEndRef} /> */}
      </div>
    </div>
  );
};

export default MessageList;

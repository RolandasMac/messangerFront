import { useEffect, useRef, useState } from "react";
import { smsServer } from "../plugins/host";
import io from "socket.io-client";
import { useSelector } from "react-redux";

function SendSmsPage() {
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const newMessagesRef = useRef();
  const user = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    newMessagesRef.current = [...messages];
    // console.log(messages);
  }, [messages]);
  useEffect(() => {
    const Socket = io(`${smsServer}`);
    Socket.on("getSms", ({ data }) => {
      // console.log([...newMessagesRef.current, ...data]);
      setMessages([...newMessagesRef.current, ...data]);
    });
    Socket.on("getAllSms", ({ data }) => {
      console.log(data.data);
      setMessages(data.data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(user);
    const form = event.currentTarget.parentElement;
    const formData = new FormData(form);

    let sendData = {};
    for (let [key, val] of formData) {
      sendData[key] = val;
    }
    sendData.phoneNumber = `+370${sendData.phoneNumber}`;
    sendData.user = user.user.name;
    // console.log(sendData);

    fetch(`${smsServer}send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          setError("Kažkas negerai su žinutės išsiuntimu");
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
        return response.json();
      })
      .then((data) => {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
        form.reset();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  return (
    <div>
      <form className="flex flex-col gap-2">
        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}! </span>
          </div>
        )}
        <h1>This is Send SMS page</h1>
        <div>
          <span>+370</span>
          <input
            className="rounded"
            type="text"
            minLength="8"
            maxLength="8"
            placeholder="Įveskite gavėjo tel. numerį"
            name="phoneNumber"
          />
        </div>

        <textarea
          className="rounded"
          type="text"
          placeholder="Įveskite žinutės tekstą"
          name="message"
        />
        <button className="btn btn-active btn-ghost" onClick={handleSubmit}>
          Siųsti SMS
        </button>
      </form>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages &&
          messages.toReversed().map((message, index) => (
            <div
              key={index}
              className={
                // Reikia pakeisti!!!!
                message.sender === user.user.name
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              {/* <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={message.owner ? message.owner.photo : ""}
                  />
                </div>
              </div> */}
              <div className="chat-header">
                {message.sender ? message.sender + "  " : ""}
                <time className="text-xs opacity-50">
                  {new Date(message.dateTimeSent).toLocaleString()}
                </time>
              </div>
              {/* <LikeButton
                conversationId={oneConv._id}
                messageId={message._id}
                userId={message.ownerId}
                msglikes={message.likes}
                curUser={user.user.id}
              /> */}
              <div className="chat-bubble">
                {message.message ? message.message : ""}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SendSmsPage;

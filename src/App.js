import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import daisyui from "daisyui";
import Layout from "./pages/Layout.jsx";
import TodoPage from "./pages/TodoPage";
import SendEmailPage from "./pages/loginPages/SendEmailPage.jsx";
import CreateUserPage from "./pages/loginPages/CreateUserPage.jsx";
import LoginPage from "./pages/loginPages/LoginPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { getAllUsers } from "./reducers/allUsersSlice.js";
// const socket = io("http://localhost:5000");
import { useDispatch, useSelector } from "react-redux";
import { autologinUser } from "./reducers/authSlice.js";
import ProfilePage from "./pages/ProfilePage.jsx";
import OneUserPage from "./pages/OneUserPage.jsx";
import ConversationsPage from "./pages/ConversationsPage.jsx";

function App() {
  //**************************** */
  // const [fraze, setFraze] = useState(null);
  // const [fraze1, setFraze1] = useState(null);
  //Sockets *******************************

  // useEffect(() => {
  //   // Listening for an event from the server
  //   socket.on("message", (data) => {
  //     setFraze(data);
  //   });
  //   socket.on("message1", (data) => {
  //     setFraze1(data);
  //   });
  //   // Clean up the connection when the component unmounts
  //   return () => {
  //     socket.off("message");
  //   };
  // }, []);
  //****************************************************** */

  const user = useSelector((state) => {
    return state.user;
  });
  const [socket, setSocket] = useState(null);
  const [conectedUsers, setConectedUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Autologin
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      // alert("Tokenas yra");
      dispatch(autologinUser({ token: token }));
      // dispatch(getAllUsers());
    }
  }, []);
  useEffect(() => {
    if (user.logged) {
      const newSocket = io("http://localhost:5004"); // Adjust this if your server is on a different port

      setSocket(newSocket);

      newSocket.emit("clientInfo", {
        id: user.user.id,
        username: user.user.name,
        avatar: user.user.photo,
      });
      newSocket.on("chatMessage", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      newSocket.on("welcomeMessage", (data) => {
        console.log(data.message, data);
        setConectedUsers(data.conectedUsers);
      });
      newSocket.on("fetchUsers", () => {
        // alert("fetchUsers work!!!");
        // console.log(data.message, data);
        // setConectedUsers((prev) => [...prev, data.conectedUser]);
        dispatch(getAllUsers());
      });

      newSocket.on("disconecteduser", (data) => {
        console.log(data.message);
        setConectedUsers((prev) => {
          return prev.filter((cur) => cur.id !== data.user.id);
        });
      });

      return () => {
        newSocket.off("chatMessage");
        newSocket.off("welcomeMessage");
        newSocket.off("disconecteduser");
        newSocket.off("");
        newSocket.off("");
      };
    }
  }, [user.user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout socket={socket} />}>
          <Route index element={<HomePage />} />
          <Route
            path="home"
            element={
              <HomePage
              // fraze={fraze}
              // // socket={socket}
              // fraze1={fraze1}
              />
            }
          />
          <Route path="todo" element={<TodoPage />} />
          <Route path="sendemail" element={<SendEmailPage />} />
          <Route path="createuser" element={<CreateUserPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="chat"
            element={
              <ChatPage
                socket={socket}
                conectedUsers={conectedUsers}
                messages={messages}
              />
            }
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="oneuser/:userId" element={<OneUserPage />} />
          <Route
            path="conversations/:convId?"
            element={<ConversationsPage socket={socket} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

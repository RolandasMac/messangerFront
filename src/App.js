import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import Layout from "./pages/Layout.jsx";
import TodoPage from "./pages/TodoPage";
import SendEmailPage from "./pages/loginPages/SendEmailPage.jsx";
import CreateUserPage from "./pages/loginPages/CreateUserPage.jsx";
import LoginPage from "./pages/loginPages/LoginPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { getAllUsers } from "./reducers/allUsersSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { autologinUser } from "./reducers/authSlice.js";
import ProfilePage from "./pages/ProfilePage.jsx";
import OneUserPage from "./pages/OneUserPage.jsx";
import ConversationsPage from "./pages/ConversationsPage.jsx";
import {
  addMessage,
  deleteOneConvLocaly,
} from "./reducers/conversations/oneConvSlice.js";
import {
  getConvList,
  updateConvListHasNewMsg,
} from "./reducers/conversations/convListSlice";
import ChatWindow from "./pages/ChatWindowPage.jsx";
import WithLoginComponent from "./components/WithLoginComponent.jsx";
import ChanhePasswordPage from "./pages/loginPages/ChangePasswordPage.jsx";

function App() {
  const oneConv = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const convList = useSelector((state) => {
    // console.log(state.convList.convList);
    return state.convList.convList;
  });

  const newConverIdRef = useRef(oneConv);

  useEffect(() => {
    newConverIdRef.current = oneConv; // Update ref whenever state changes
  }, [oneConv]);

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
    if (token) {
      dispatch(autologinUser({ token: token }));
    }
  }, [dispatch]);
  useEffect(() => {
    if (user.logged) {
      const newSocket = io("http://localhost:5004");
      setSocket(newSocket);
      newSocket.emit("clientInfo", {
        id: user.user.id,
        username: user.user.name,
        avatar: user.user.photo,
      });
      newSocket.on("renewUserData", () => {
        // alert("new socket conection");
        newSocket.emit("clientInfo", {
          id: user.user.id,
          username: user.user.name,
          avatar: user.user.photo,
        });
      });

      newSocket.on("chatMessage", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      newSocket.on("welcomeMessage", (data) => {
        setConectedUsers(data.conectedUsers);
      });
      newSocket.on("fetchUsers", () => {
        dispatch(getAllUsers());
      });

      newSocket.on("newmessage", async (lastMessage) => {
        if (newConverIdRef.current._id === lastMessage._id) {
          dispatch(addMessage(lastMessage.lastMessage));
        } else {
          // alert("suveikė");
          dispatch(getConvList());
        }
      });
      newSocket.on("renewData", async (convId) => {
        dispatch(getConvList());
        // Dar reikia visą sąrašą žinučių atnaujinti
        // alert("Suveikė");
        // alert(convId + " " + newConverIdRef.current._id);
        // console.log(oneConv);
        if (newConverIdRef.current._id === convId) {
          // alert("sutapo");
          dispatch(deleteOneConvLocaly());
        }
      });

      return () => {
        newSocket.off("chatMessage");
        newSocket.off("welcomeMessage");
        newSocket.off("disconecteduser");
        newSocket.off("newmessage");
        newSocket.off("renewUserData");
        newSocket.off("renewData");
      };
    }
  }, [user.user]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout socket={socket} />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="sendemail" element={<SendEmailPage />} />
          <Route path="createuser" element={<CreateUserPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route
            path="chat"
            element={
              <WithLoginComponent>
                <ChatPage
                  socket={socket}
                  conectedUsers={conectedUsers}
                  messages={messages}
                />
              </WithLoginComponent>
            }
          />
          <Route
            path="conversations/:convId?"
            element={
              <WithLoginComponent>
                <ConversationsPage socket={socket} />
              </WithLoginComponent>
            }
          />
          {/* 
          <Route
            path="chat"
            element={
              <ChatPage
                socket={socket}
                conectedUsers={conectedUsers}
                messages={messages}
              />
            }
          /> */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="changepassword" element={<ChanhePasswordPage />} />

          <Route
            path="oneuser/:userId"
            element={<OneUserPage socket={socket} />}
          />
          {/* <Route
            path="conversations/:convId?"
            element={<ConversationsPage socket={socket} />}
          /> */}
          <Route path="chatwindow" element={<ChatWindow socket={socket} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

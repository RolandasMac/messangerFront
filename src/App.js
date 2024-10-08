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
  getRenewedOneConvById,
} from "./reducers/conversations/oneConvSlice.js";
import {
  getConvList,
  updateConvListHasNewMsg,
} from "./reducers/conversations/convListSlice";
import ChatWindow from "./pages/ChatWindowPage.jsx";
import WithLoginComponent from "./components/WithLoginComponent.jsx";
import ChanhePasswordPage from "./pages/loginPages/ChangePasswordPage.jsx";
import SendEmailForChangePage from "./pages/loginPages/SendEmailForChange.jsx";
import ChanheEmailPage from "./pages/loginPages/ChangeEmailPage.jsx";
import { getOneUser } from "./reducers/oneUserSlice.js";
import { backSocketHost } from "./plugins/host.js";
import AboutPage from "./pages/AboutPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

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
  const oneUserId = useSelector((state) => {
    return state.oneUser.oneUser.id;
  });
  const newOneUserIdRef = useRef(oneUserId);

  useEffect(() => {
    newOneUserIdRef.current = oneUserId; // Update ref whenever state changes
  }, [oneUserId]);

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
      const newSocket = io(`https://${backSocketHost}:5004`);
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
        // console.log(lastMessage);
        if (newConverIdRef.current._id === lastMessage._id) {
          dispatch(addMessage(lastMessage.lastMessage));
        } else {
          // alert("suveikė");
          dispatch(getConvList());
        }
      });
      newSocket.on("renewData", async (convId) => {
        dispatch(getConvList());
        if (newConverIdRef.current._id === convId) {
          dispatch(deleteOneConvLocaly());
        }
      });
      newSocket.on("renewOneConvData", async (convId) => {
        if (newConverIdRef.current._id === convId) {
          dispatch(getRenewedOneConvById({ convId: convId }));
        }
      });
      newSocket.on("renewOneUserData", async (data) => {
        if (newOneUserIdRef.current === data) {
          dispatch(getOneUser(data));
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
          <Route path="about" element={<AboutPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route
            path="todo"
            element={
              <WithLoginComponent>
                <TodoPage />
              </WithLoginComponent>
            }
          />
          {/* <Route path="todo" element={<TodoPage />} /> */}
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
          <Route
            path="profile"
            element={
              <WithLoginComponent>
                <ProfilePage socket={socket} />
              </WithLoginComponent>
            }
          />
          <Route
            path="changepassword"
            element={
              <WithLoginComponent>
                <ChanhePasswordPage socket={socket} />
              </WithLoginComponent>
            }
          />
          <Route
            path="oneuser/:userId"
            element={
              <WithLoginComponent>
                <OneUserPage socket={socket} />
              </WithLoginComponent>
            }
          />
          {/* <Route path="chatwindow" element={<ChatWindow socket={socket} />} /> */}
          <Route
            path="sendemailforchange"
            element={
              <WithLoginComponent>
                <SendEmailForChangePage socket={socket} />
              </WithLoginComponent>
            }
          />
          <Route
            path="changeemail"
            element={
              <WithLoginComponent>
                <ChanheEmailPage socket={socket} />
              </WithLoginComponent>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

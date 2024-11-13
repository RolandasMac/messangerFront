import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getConvList } from "../reducers/conversations/convListSlice";
import FooterComponent from "../components/FooterComponent";

function Layout(props) {
  const currentConversation = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const convList = useSelector((state) => {
    return state.convList.convList;
  });
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const user = useSelector((state) => {
    return state.user.user;
  });

  useEffect(() => {
    setId(currentConversation._id);
  }, [currentConversation]);
  useEffect(() => {
    if (user.isOnline) {
      dispatch(getConvList()).then((data) => {
        setId(
          data.payload.data.length > 0
            ? data.payload.data[0]._id
            : currentConversation._id
        );
      });
    }
  }, []);

  return (
    <div className="container mx-auto">
      <Header className="p-0" socket={props.socket}>
        Labas, čia Header
      </Header>
      <div className="flex">
        <div className="bg-gray-200 rounded flex-none w-45 p-2 mr-5 min-h-full">
          <h4 className="mymenu mb-5 text-center mt-3 mb-0">Menu</h4>
          <div className="flex w-full flex-col">
            <div className="divider"></div>
          </div>
          <ul className="mymenu1 flex flex-col gap-5">
            <li>
              {
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Link>
              }
            </li>

            <li>
              {
                <Link
                  to="/about"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Apie mane
                </Link>
              }
            </li>
            <li>
              {
                <Link
                  to="/resume"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Apie projektą
                </Link>
              }
            </li>
            {/* <li>
              {
                <Link
                  to="/cinema"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Projektai
                </Link>
              }
            </li> */}
            <li>
              {
                <Link
                  to="/canvas"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Projektai
                </Link>
              }
            </li>

            <li>
              {
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Kontaktai
                </Link>
              }
            </li>

            <li>
              {
                <Link
                  to="/todo"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Priminimai
                </Link>
              }
            </li>
            <li>
              {
                <Link
                  to="/sendsms"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Siųsti SMS
                </Link>
              }
            </li>
            {/* <li>{<Link to="/sendemail">Send email</Link>}</li>
            <li>{<Link to="/createuser">Create user</Link>}</li>
            <li>{<Link to="/login">Login</Link>}</li> */}
            <h4 className="text-center m-0 p-0">Chat'as</h4>
            {/* <div className="flex w-full h-2 flex-col">
              <div className="divider"></div>
            </div> */}
            <li>
              {
                <Link
                  to="/chat"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Dalyviai
                </Link>
              }
            </li>
            <li>
              {
                <Link
                  to={`/conversations/${id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Susirašinėjimas
                </Link>
              }
            </li>
            {/* <li>{<Link to={"/chatwindow"}>Pokalbiai1</Link>}</li> */}
          </ul>
        </div>
        <div className="flex-1 w-32">
          <Outlet></Outlet>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default Layout;

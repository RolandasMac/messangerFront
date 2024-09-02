import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getConvList } from "../reducers/conversations/convListSlice";

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
        <div className="bg-gray-200 rounded flex-none w-40 pl-2 mr-5">
          <h4 className="mymenu mb-5 text-center mt-3 mb-0">Menu</h4>
          <div className="flex w-full flex-col">
            <div className="divider"></div>
          </div>
          <ul className="mymenu1 flex flex-col gap-5">
            {/* <li>{<Link to="/home">Home</Link>}</li> */}
            <li>{<Link to="/todo">Priminimai</Link>}</li>
            {/* <li>{<Link to="/sendemail">Send email</Link>}</li>
            <li>{<Link to="/createuser">Create user</Link>}</li>
            <li>{<Link to="/login">Login</Link>}</li> */}
            <li>{<Link to="/chat">Dalyviai</Link>}</li>
            <li>{<Link to={`/conversations/${id}`}>Susirašinėjimas</Link>}</li>
            {/* <li>{<Link to={"/chatwindow"}>Pokalbiai1</Link>}</li> */}
          </ul>
        </div>
        <div className="flex-1 w-32">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Layout;

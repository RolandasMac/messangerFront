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

  useEffect(() => {
    setId(currentConversation._id);
  }, [currentConversation]);
  useEffect(() => {
    dispatch(getConvList()).then((data) => {
      console.log(data);
      setId(
        data.payload.data.length > 0
          ? data.payload.data[0]._id
          : currentConversation._id
      );
    });
  }, []);

  return (
    <div className="container mx-auto">
      <Header className="p-0" socket={props.socket}>
        Labas, čia Header
      </Header>
      <div className="flex">
        <div className="bg-gray-200 rounded flex-none w-24 pl-2">
          <h4>Toolbar</h4>
          <ul>
            <li>{<Link to="/home">Home</Link>}</li>
            <li>{<Link to="/todo">Todo</Link>}</li>
            <li>{<Link to="/sendemail">Send email</Link>}</li>
            <li>{<Link to="/createuser">Create user</Link>}</li>
            <li>{<Link to="/login">Login</Link>}</li>
            <li>{<Link to="/chat">Chat</Link>}</li>
            <li>{<Link to={`/conversations/${id}`}>Pokalbiai</Link>}</li>
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

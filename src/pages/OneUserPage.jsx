import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneConv } from "../reducers/conversations/oneConvSlice";
import { getOneUser } from "../reducers/oneUserSlice";
function OneUserPage({ socket }) {
  //   const location = useLocation();
  //   const convEntry = location.state || {};
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const oneUser = useSelector((state) => {
    return state.oneUser;
  });
  const oneConv = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const inputRef = useRef(null);

  const navigate = useNavigate();

  async function createConvAndSendMessage() {
    const participants = [
      { userId: user.user.id },
      { userId: oneUser.oneUser._id },
    ];
    console.log(participants);
    console.log(oneUser);
    const newMessage = {
      message: inputRef.current.value,
      ownerId: user.user.id,
      createdAt: new Date().toISOString(),
    };

    const sendData = { participants, newMessage };

    const result = await dispatch(getOneConv(sendData));
    console.log(result.payload.data._id);

    // Send message tru the sockets
    // if (newMessage.message !== "") {
    //   socket.emit("chatMessage", {
    //     userId: user.user.id,
    //     message: newMessage.message,
    //     toConv: oneConv._id,
    //   });
    //   inputRef.current.value = "";
    // }

    if (result.meta.requestStatus === "fulfilled") {
      navigate(`/conversations/${result.payload.data._id}`);
    }
  }

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, []);

  return (
    <>
      <h1>This is one user page</h1>
      {oneUser.oneUser && (
        <div>
          <div className="flex flex-row items-center gap-2 bg-slate-100">
            <div
              className={
                oneUser.oneUser.isOnline ? "avatar online" : "avatar  offline"
              }
            >
              <div className="w-12 rounded-full">
                <img src={oneUser.oneUser.photo} />
              </div>
            </div>
            <span>{oneUser.oneUser.name}</span>
          </div>
        </div>
      )}
      <input ref={inputRef} type="text" placeholder="Rašykite žinutę" />
      <button
        type="button"
        name=""
        id=""
        className="btn btn-active"
        onClick={createConvAndSendMessage}
      >
        Siųsti žinutę
      </button>
    </>
  );
}

export default OneUserPage;

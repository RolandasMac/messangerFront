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
  const checkBoxRef = useRef(null);

  const navigate = useNavigate();

  async function createConvAndSendMessage() {
    const participants = [
      { userId: user.user.id },
      { userId: oneUser.oneUser._id },
    ];

    const newMessage = {
      message: inputRef.current.value,
      ownerId: user.user.id,
      createdAt: new Date().toISOString(),
    };
    const newConvCreate = { createNew: checkBoxRef.current.checked };

    const sendData = { participants, newMessage, newConvCreate };

    const result = await dispatch(getOneConv(sendData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate(`/conversations/${result.payload.data._id}`);
    }
  }

  useEffect(() => {
    dispatch(getOneUser(userId));
  }, []);

  return (
    <div className="p-5 flex flex-col gap-5">
      {/* <h1>This is one user page</h1> */}
      {oneUser.oneUser && (
        <div>
          <div className="flex flex-row items-center gap-2 bg-slate-100">
            <div
              className={
                oneUser.oneUser.isOnline ? "avatar online" : "avatar  offline"
              }
            >
              <div className="w-20 rounded-full">
                <img src={oneUser.oneUser.photo} />
              </div>
            </div>
            <h2>{oneUser.oneUser.name}</h2>
          </div>
        </div>
      )}
      <div className="flex flex-row gap-2 items-center">
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

        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              ref={checkBoxRef}
              type="checkbox"
              defaultChecked
              className="checkbox"
            />
            <span className="label-text">Sukurti naują pokalbį</span>
          </label>
        </div>

        {/* <input type="checkbox" /> */}
        {/* <span>Sukurti naują pokalbį</span> */}
      </div>
    </div>
  );
}

export default OneUserPage;

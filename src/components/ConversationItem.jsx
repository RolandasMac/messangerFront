import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneConv,
  deleteOneConvById,
} from "../reducers/conversations/oneConvSlice";
import { Delete } from "@mui/icons-material";

const ConversationItem = ({
  conversation,
  // onSelectConversation,
  curUserId,
  curConv,
}) => {
  const { convParticipants } = conversation;
  const dispatch = useDispatch();

  // const handleClick = ({ convId }) => {
  //   onSelectConversation(convId);
  // };
  function deleteConvWarn() {
    document.getElementById("my_modal_5").showModal();
    // alert(id);
  }
  function deleteConv(id) {
    // alert("Veikia ištrynimas " + id);
    dispatch(deleteOneConvById({ convId: id }));
  }

  return (
    <div
      key={conversation._id}
      //  onClick={() => handleClick(conversation)}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-1 flex-wrap">
          {convParticipants.map((participant) =>
            // <span key={participant.userId} style={{ marginRight: "10px" }}>
            //   <img
            //     src={participant.avatar}
            //     alt={participant.userName}
            //     className="border rounded"
            //     // style={{ width: "20px", borderRadius: "100%" }}
            //   />
            //   {participant.userName}
            // </span>

            curUserId !== participant.userId ? (
              <div
                className="flex flex-row items-center gap-2 bg-slate-100"
                // onClick={() => navigate(`/oneuser/${cur._id}`)}
                key={participant.userId}
              >
                <div className="avatar">
                  <div className="w-6 rounded-full">
                    <img src={participant.userInfo.photo} />
                  </div>
                </div>
                {/* <span>{participant.userName}</span> */}
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>
        {conversation._id === curConv && (
          <div
            className="indicator-item badge badge-warning"
            onClick={() => deleteConvWarn()}
            // onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <Delete style={{ fontSize: 18 }} />

            {/* <button
              className="btn"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              open modal
            </button> */}
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Įspejimas!</h3>
                <p className="py-4">
                  Ar tikrai norite ištrinti pažymėtą pokalbį?
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <div className="flex flex-row justify-end gap-5">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        onClick={() => deleteConv(conversation._id)}
                        className="btn"
                      >
                        Trinti
                      </button>
                      <button className="btn">Atsisakyti</button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;

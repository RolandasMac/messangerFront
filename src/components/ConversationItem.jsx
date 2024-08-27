import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneConv } from "../reducers/conversations/oneConvSlice";

const ConversationItem = ({ conversation, onSelectConversation }) => {
  const { participantsRes } = conversation;
  const dispatch = useDispatch();

  const handleClick = ({ convId }) => {
    onSelectConversation(convId);
  };

  return (
    <li onClick={() => handleClick(conversation)}>
      <div className="flex flex-row gap-1">
        {participantsRes.map((participant) => (
          // <span key={participant.userId} style={{ marginRight: "10px" }}>
          //   <img
          //     src={participant.avatar}
          //     alt={participant.userName}
          //     className="border rounded"
          //     // style={{ width: "20px", borderRadius: "100%" }}
          //   />
          //   {participant.userName}
          // </span>

          <div
            className="flex flex-row items-center gap-2 bg-slate-100"
            // onClick={() => navigate(`/oneuser/${cur._id}`)}
            key={participant._id}
          >
            <div className="avatar">
              <div className="w-6 rounded-full">
                <img src={participant.photo} />
              </div>
            </div>
            {/* <span>{participant.userName}</span> */}
          </div>
        ))}
      </div>
    </li>
  );
};

export default ConversationItem;

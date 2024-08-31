import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneConv } from "../reducers/conversations/oneConvSlice";

const ConversationItem = ({
  conversation,
  // onSelectConversation,
  curUserId,
}) => {
  const { convParticipants } = conversation;
  const dispatch = useDispatch();

  // const handleClick = ({ convId }) => {
  //   onSelectConversation(convId);
  // };

  return (
    <div
      key={conversation._id}
      //  onClick={() => handleClick(conversation)}
    >
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
    </div>
  );
};

export default ConversationItem;

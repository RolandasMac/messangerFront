import React, { useEffect } from "react";
import ConversationItem from "./ConversationItem";
import { useDispatch, useSelector } from "react-redux";
import { getConvList } from "../reducers/conversations/convListSlice";
import { useNavigate } from "react-router";

const ConversationList = ({ onSelectConversation }) => {
  const dispatch = useDispatch();
  const convList = useSelector((state) => {
    // console.log(state.convList.convList);
    return state.convList.convList;
  });
  const currentConversation = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const currentUser = useSelector((state) => {
    return state.user.user;
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getConvList());
  }, []);
  return (
    <ul className="flex flex-col gap-5">
      {convList.length &&
        convList.map((conv) => {
          return (
            <div
              key={conv._id}
              className={
                currentConversation._id == conv._id
                  ? "bg-slate-300 rounded p-2"
                  : "rounded p-2"
              }
              onClick={() => navigate(`/conversations/${conv._id}`)}
            >
              <span>
                New msg(
                {conv.convParticipants.map((cur) => {
                  if (cur.userId === currentUser.id) {
                    return cur.hasNewMsg;
                  } else {
                    return "";
                  }
                })}
                )
              </span>
              <ConversationItem
                key={conv._id}
                conversation={conv}
                onSelectConversation={onSelectConversation}
                curUserId={currentUser.id}
              />
            </div>
          );
        })}
    </ul>
  );
};

export default ConversationList;

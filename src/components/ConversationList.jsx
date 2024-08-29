import React, { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { useDispatch, useSelector } from "react-redux";
import { getConvList } from "../reducers/conversations/convListSlice";
import { useNavigate } from "react-router";

const ConversationList = () => {
  const dispatch = useDispatch();
  const convList = useSelector((state) => {
    console.log(state.convList.convList);
    return state.convList;
  });

  const [sortedConversations, setSortedConversations] = useState([]);

  useEffect(() => {
    console.log(convList.convList);
    if (convList.convList) {
      const sorted = [...convList.convList].sort((a, b) => {
        const nameA = a._id;
        const nameB = b._id;
        return nameA.localeCompare(nameB);
      });
      setSortedConversations(sorted);
    }
  }, [convList]);

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
    <div className="flex flex-col gap-5">
      {convList.loading && (
        <div className="flex flex-row justify-center">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      )}
      {convList.loaded &&
        sortedConversations.map((conv) => {
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
                <strong>
                  {conv.convParticipants.map((cur) => {
                    if (cur.userId === currentUser.id && cur.hasNewMsg > 0) {
                      return `(${cur.hasNewMsg})`;
                    } else {
                      return "";
                    }
                  })}
                </strong>
              </span>
              <ConversationItem
                key={conv._id}
                conversation={conv}
                // onSelectConversation={onSelectConversation}
                curUserId={currentUser.id}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ConversationList;

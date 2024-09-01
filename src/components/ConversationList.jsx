import React, { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { useDispatch, useSelector } from "react-redux";
import { getConvList } from "../reducers/conversations/convListSlice";
import { useNavigate } from "react-router";
import "../styles.css";

const ConversationList = () => {
  const dispatch = useDispatch();
  const convList = useSelector((state) => {
    return state.convList;
  });

  const [sortedConversations, setSortedConversations] = useState([]);

  useEffect(() => {
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
    <div className="">
      {convList.loading && (
        <div className="flex flex-row justify-center">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      )}
      <div className="flex flex-col ">
        {convList.loaded &&
          sortedConversations.map((conv) => {
            return (
              <div
                key={conv._id}
                className={
                  currentConversation._id == conv._id
                    ? "bg-gray-200 rounded p-2 "
                    : "rounded p-2 flex flex-row justify-between"
                }
                onClick={() => navigate(`/conversations/${conv._id}`)}
              >
                <ConversationItem
                  curConv={currentConversation._id}
                  key={conv._id}
                  conversation={conv}
                  curUserId={currentUser.id}
                />
                <span>
                  {conv.convParticipants.map((cur) => {
                    if (cur.userId === currentUser.id && cur.hasNewMsg > 0) {
                      return (
                        <div className="notification-icon">
                          <span className="icon">📩</span>
                          {cur.userId === currentUser.id &&
                            cur.hasNewMsg > 0 && (
                              <span className="message-count">
                                {cur.hasNewMsg}
                              </span>
                            )}
                        </div>
                      );
                    } else {
                      return "";
                    }
                  })}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ConversationList;

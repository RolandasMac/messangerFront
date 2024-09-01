import { useEffect } from "react";
import React, { useState } from "react";
import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getOneConvById } from "../reducers/conversations/oneConvSlice";
import { getConvList } from "../reducers/conversations/convListSlice";

function ConversationsPage({ socket }) {
  const currentConversation = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [oldId, setOldId] = useState(null);
  const { convId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(currentConversation);
    setSelectedConversation(convId);
    const oldConvId = !oldId ? convId : oldId;
    const data = { oldId: oldConvId, convId: convId };

    dispatch(getOneConvById(data)).then(() => {
      dispatch(getConvList());
    });

    setOldId(convId);
  }, [convId]);

  return (
    <>
      <div className="flex flex-row">
        <div className="w-36">
          <h2 className="text-center">Dalyviai</h2>
          <ConversationList
          //  onSelectConversation={handleSelectConversation}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-center">Susirašinėjimai</h2>
          {selectedConversation ? (
            <MessageList
              socket={socket}
              messages={currentConversation.messages}
              convId={convId}
            />
          ) : (
            <p>Select a conversation to view messages</p>
          )}
        </div>
      </div>
    </>
  );
}
export default ConversationsPage;

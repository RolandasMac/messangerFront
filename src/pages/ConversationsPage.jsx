import { useEffect } from "react";
import React, { useState } from "react";
import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getOneConvById } from "../reducers/conversations/oneConvSlice";

function ConversationsPage({ socket }) {
  const currentConversation = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { convId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedConversation(convId);
    // alert("dispatch one conv " + convId);
    dispatch(getOneConvById(convId));
  }, [convId]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <>
      <button onClick={() => alert(selectedConversation)}>
        One conversation
      </button>
      <div className="flex flex-row">
        <div className="w-36">
          <h2>Conversations</h2>
          <ConversationList onSelectConversation={handleSelectConversation} />
        </div>
        <div className="flex-1">
          <h2>Messages</h2>
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

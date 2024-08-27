import { useEffect } from "react";
import React, { useState } from "react";
import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getOneConvById } from "../reducers/conversations/oneConvSlice";

// Mock data for conversations
const mockConversations = [
  {
    convId: "1",
    convParticipants: [
      { userId: "user1", userName: "John Doe", avatar: "avatar1.png" },
      { userId: "user2", userName: "Jane Smith", avatar: "avatar2.png" },
    ],
    messages: [
      {
        message: "Hello, how are you?",
        owner: { userId: "user1", userName: "John Doe", avatar: "avatar1.png" },
        createdAt: "2023-08-21T10:00:00Z",
      },
      {
        message: "I am good, thanks!",
        owner: {
          userId: "user2",
          userName: "Jane Smith",
          avatar: "avatar2.png",
        },
        createdAt: "2023-08-21T10:05:00Z",
      },
    ],
  },
  // Add more conversations here
];

function ConversationsPage({ socket }) {
  const currentConversation = useSelector((state) => {
    return state.oneConv.oneConv;
  });
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { convId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(currentConversation);
    setSelectedConversation(convId);
    console.log(convId);
    dispatch(getOneConvById(convId));
  }, [convId]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    //parsiųsti conversation pagal id
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%" }}>
          <h2>Conversations</h2>
          <ConversationList
            // conversations={mockConversations}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        <div style={{ width: "70%", padding: "0 20px" }}>
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

import { useEffect } from "react";
import React, { useState } from "react";
import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import { useNavigate, useParams } from "react-router";
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
  const navigate = useNavigate();
  // useEffect(() => {
  //   setSelectedConversation(convId);
  // }, [convId]);

  useEffect(() => {
    // console.log(currentConversation);
    // alert("setSelected " + convId);

    const oldConvId = oldId === "null" ? convId : oldId;
    const data = { oldId: oldConvId, convId: convId };
    if (convId !== "null") {
      dispatch(getOneConvById(data)).then(() => {
        dispatch(getConvList());
        setOldId(convId);
      });
    }
  }, []);
  function setCurrentConv(curId) {
    // alert(curId);
    setSelectedConversation(curId);
    navigate(`/conversations/${curId}`);
    // const oldConvId = !oldId ? curId : oldId;
    const data = { oldId: oldId, convId: curId };
    dispatch(getOneConvById(data)).then(() => {
      dispatch(getConvList());
      setOldId(curId);
    });
  }

  return (
    <>
      {/* <button
        onClick={() => {
          console.log(currentConversation);
        }}
      >
        Log state
      </button> */}

      <div className="flex flex-row">
        <div className="w-36">
          <h2 className="text-center">Dalyviai</h2>
          <ConversationList
            setSelectedConversation={setSelectedConversation}
            setCurrentConv={setCurrentConv}

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
            // <p>Select a conversation to view messages</p>
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
export default ConversationsPage;

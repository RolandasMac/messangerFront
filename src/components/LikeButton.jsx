import React, { useEffect, useState } from "react";
import { addLike } from "../reducers/conversations/oneConvSlice";
import { useDispatch } from "react-redux";

const LikeButton = ({
  conversationId,
  messageId,
  userId,
  msglikes,
  curUser,
}) => {
  const [likes, setLikes] = useState(msglikes); // Initial state for likes count
  const [hasLiked, setHasLiked] = useState(false); // Initial state to check if the

  const dispatch = useDispatch();

  const handleLike = async () => {
    // alert(msgOwner + " " + userId);
    if (hasLiked) return; // Prevent multiple likes by the same user
    console.log(msglikes);
    alert(msglikes[0]);
    const like = { convId: conversationId, msgId: messageId, userId: userId };
    dispatch(addLike(like));

    try {
      setLikes(likes + 1); // Update the likes count on the frontend
      setHasLiked(true); // Mark as liked to prevent multiple likes
    } catch (error) {
      console.error("Error liking the message:", error);
    }
  };
  useEffect(() => {
    console.log(msglikes);
  }, []);
  return (
    <div>
      {curUser !== userId && (
        <button onClick={handleLike} disabled={hasLiked}>
          {hasLiked ? "Liked" : "Like"}
        </button>
      )}
      ({likes}){![123, 123, 123].includes(123) && <span>Rodo</span>}
      {/* {!msglikes.includes(curUser) && <span>{curUser + userId}</span>} */}
    </div>
  );
};

export default LikeButton;

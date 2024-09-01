import React, { useState } from "react";
import {
  addLike,
  getOneConv,
  deleteOneConvById,
} from "../reducers/conversations/oneConvSlice";
import { useDispatch } from "react-redux";

const LikeButton = ({ conversationId, messageId, userId, msglikes }) => {
  const [likes, setLikes] = useState(msglikes.length); // Initial state for likes count
  const [hasLiked, setHasLiked] = useState(false); // Initial state to check if the

  const dispatch = useDispatch();

  const handleLike = async () => {
    if (hasLiked) return; // Prevent multiple likes by the same user
    console.log(msglikes);
    alert(messageId);
    const like = { convId: 123, msgId: 123, userId: 123 };
    dispatch(addLike(like));

    try {
      setLikes(likes + 1); // Update the likes count on the frontend
      setHasLiked(true); // Mark as liked to prevent multiple likes
    } catch (error) {
      console.error("Error liking the message:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLike} disabled={hasLiked}>
        {hasLiked ? "Liked" : "Like"} ({likes})
      </button>
    </div>
  );
};

export default LikeButton;

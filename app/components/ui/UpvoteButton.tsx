"use client";
import React, { useState } from "react";
import { ArrowBigUp } from "lucide-react";
interface UpvoteButtonProps {
  onUpvote: (id: number) => void;
  feedbackID: number;
  initial: boolean;
}

function UpvoteButton({ onUpvote, feedbackID, initial }: UpvoteButtonProps) {
  const [isUp, setIsUp] = useState(initial);

  const handleUpVote = () => {
    setIsUp(!isUp);
    onUpvote(feedbackID);
  };
  return (
    <div>
      <button
        onClick={() => handleUpVote()}
        className={`mt-4 p-2 rounded-xl bg-gray-300 ${
          isUp
            ? "bg-red-500"
            : "bg-gray-300 hover:bg-orange-400 transition-all duration-300 hover:text-white "
        }`}
      >
        <ArrowBigUp />
      </button>
    </div>
  );
}

export default UpvoteButton;

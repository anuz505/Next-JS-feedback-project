"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ArrowBigUp } from "lucide-react";
import type { UpvoteButtonProps } from "@/app/lib/types";

function UpvoteButton({ onUpvote, feedbackID, initial }: UpvoteButtonProps) {
  const [isUp, setIsUp] = useState(initial);

  const handleUpVote = () => {
    setIsUp(!isUp);
    onUpvote(feedbackID);
  };
  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleUpVote();
        }}
        className={`mt-4 p-2 rounded-xl bg-gray-300 ${
          isUp
            ? "bg-red-500 text-white"
            : "bg-gray-300 hover:bg-orange-400 transition-all duration-300 hover:text-white "
        }`}
      >
        <ArrowBigUp />
      </button>
    </div>
  );
}

export default UpvoteButton;

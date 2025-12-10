import React from "react";
import FeedbackCard from "./FeedbackCard";
import type { FeedbackListProps } from "../lib/types";

function FeedbackList({
  feedbacks,
  onEdit,
  onDelete,
  deletingId,
}: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return (
      <div>
        <p>No feedback</p>
      </div>
    );
  }
  return (
    <div>
      {feedbacks.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          feedback={feedback}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === feedback.id}
        />
      ))}
    </div>
  );
}

export default FeedbackList;

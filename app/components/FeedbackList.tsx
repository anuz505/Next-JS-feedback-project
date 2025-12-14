import React from "react";
import FeedbackCard from "./FeedbackCard";
import type { FeedbackListProps } from "../lib/types";
import { MessageSquare } from "lucide-react";

function FeedbackList({
  feedbacks,
  onEdit,
  onDelete,
  deletingId,
  onUpvote,
  onStatusUpdate,
  onCardClick,
}: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-black mb-2">
          No feedback yet
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          Be the first to share your thoughts! Click the button above to add
          your feedback.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedbacks.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          feedback={feedback}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === feedback.id}
          onUpvote={onUpvote}
          onStatusUpdate={onStatusUpdate}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default FeedbackList;

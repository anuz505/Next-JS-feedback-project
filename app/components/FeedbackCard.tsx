import React from "react";
import { Star } from "lucide-react";
import { FeedbackCardProps } from "../lib/types";
const FeedbackCard = ({
  feedback,
  onEdit,
  onDelete,
  isDeleting,
}: FeedbackCardProps) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < feedback.rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-500"
            }`}
          />
        ))}
      </div>
      <button onClick={() => onEdit(feedback)}>Edit</button>
      <button onClick={() => onDelete(feedback.id)}>Delete</button>
      <h1>{feedback.title}</h1>
      <p>{feedback.description}</p>
      <p>{new Date(feedback.created_at).toLocaleString()}</p>
    </div>
  );
};

export default FeedbackCard;

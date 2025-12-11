import React from "react";
import { Star, Edit2, Trash2, ArrowBigUp } from "lucide-react";
import { FeedbackCardProps } from "../lib/types";
import UpvoteButton from "./ui/UpvoteButton";

const FeedbackCard = ({
  feedback,
  onEdit,
  onDelete,
  isDeleting,
  onUpvote,
  onStatusUpdate,
}: FeedbackCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < feedback.rating ? "fill-black text-black" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-600">
            {feedback.rating}/5
          </span>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(feedback)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            disabled={isDeleting}
            aria-label="Edit feedback"
          >
            <Edit2 className="w-4 h-4 text-gray-600" />
          </button>

          <button
            onClick={() => onDelete(feedback.id)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            disabled={isDeleting}
            aria-label="Delete feedback"
          >
            {isDeleting ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
            )}
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-black mb-2">
        {feedback.title}
      </h3>

      {feedback.description && (
        <p className="text-gray-700 mb-4 leading-relaxed">
          {feedback.description}
        </p>
      )}

      <p className="text-xs text-gray-500">
        {new Date(feedback.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <div className="mt-4 ">
        <select
          value={feedback.status || "open"}
          onChange={(e) => onStatusUpdate(feedback.id, e.target.value)}
          className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-2xl "
        >
          <option value="open">Open</option>
          <option value="progress">Progressz</option>
          <option value="done">Done</option>
        </select>
      </div>
      <UpvoteButton
        feedbackID={feedback.id}
        onUpvote={onUpvote}
        initial={feedback.upvotes}
      />
    </div>
  );
};

export default FeedbackCard;

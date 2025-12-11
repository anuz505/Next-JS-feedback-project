"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Feedback, ReqBody } from "../lib/types";
import { toast } from "react-toastify";
interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReqBody) => void;
  editingFeedback?: Feedback | null;
  isSubmitting?: boolean;
  error?: any;
}

export default function FeedbackForm({
  isOpen,
  onClose,
  onSubmit,
  editingFeedback,
  isSubmitting = false,
  error,
}: FeedbackFormProps) {
  const [formData, setFormData] = useState<ReqBody>({
    title: "",
    description: "",
    rating: 5,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingFeedback) {
      setFormData({
        title: editingFeedback.title,
        rating: editingFeedback.rating,
        description: editingFeedback.description || "",
      });
    } else {
      setFormData({
        title: "",
        rating: 5,
        description: "",
      });
    }
    setErrors({});
  }, [editingFeedback, isOpen]);

  useEffect(() => {
    if (error?.details) {
      const newErrors: Record<string, string> = {};
      error.details.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    }
  }, [error]);

  const handleSubmit = () => {
    setErrors({});
    onSubmit(formData);
    toast.success("Feedback updated");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  bg-opacity-10 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black">
            {editingFeedback ? "Edit Feedback" : "New Feedback"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
            disabled={isSubmitting}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter a descriptive title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseInt(e.target.value) })
                }
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                disabled={isSubmitting}
              />
              <div className="flex items-center gap-1 min-w-[120px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < formData.rating
                        ? "fill-black text-black"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Share your detailed feedback..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              rows={4}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {error && !error.details && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">
                {error.error || "An error occurred"}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border-2 border-black text-black font-medium rounded-lg hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : editingFeedback ? (
                "Update"
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

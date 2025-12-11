"use client";
import { useState } from "react";
import { MessageSquare, Plus, Loader2 } from "lucide-react";
import {
  useCreateFeedback,
  useDeleteFeedback,
  useFeedbacks,
  useStatusFeedback,
  useUpdateFeedback,
  useUpvoteFeedback,
} from "./hooks/feedbacks";
import { Feedback, ReqBody } from "./lib/types";
import FeedbackList from "./components/FeedbackList";
import FeedbackForm from "./components/FeedbackForm";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const { data: feedbacks = [], isLoading, error } = useFeedbacks();
  const createMutation = useCreateFeedback();
  const deleteMutation = useDeleteFeedback();
  const updateMutation = useUpdateFeedback();
  const onStatusMutation = useStatusFeedback();
  const updateUpvoteMutation = useUpvoteFeedback();
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (data: ReqBody) => {
    try {
      if (editingFeedback) {
        await updateMutation.mutateAsync({ id: editingFeedback.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setEditingFeedback(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error("mutation error", error);
    }
  };

  const handleUpVote = async (id: number) => {
    await updateUpvoteMutation.mutateAsync(id);
    toast.success("upvote updated!");
  };
  const handleonStatusUpdate = async (id: number, status: string) => {
    await onStatusMutation.mutateAsync({ id, status });
    toast.success("Status updated!");
  };

  const handleEdit = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this feedback?")) {
      return;
    }
    await deleteMutation.mutateAsync(id);
  };

  const handleAdd = () => {
    setEditingFeedback(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingFeedback(null);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black">Feedback</h1>
                <p className="text-sm text-gray-600">
                  Share your thoughts and experiences
                </p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Feedback
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ToastContainer />
        {/* Stats */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Feedback</p>
            <p className="text-3xl font-bold text-black">{feedbacks.length}</p>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading...</span>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 font-medium">
              Failed to load feedback. Please try again.
            </p>
          </div>
        )}

        {/* Feedback List */}
        {!isLoading && (
          <FeedbackList
            feedbacks={feedbacks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={
              deleteMutation.isPending ? deleteMutation.variables : undefined
            }
            onUpvote={handleUpVote}
            onStatusUpdate={handleonStatusUpdate}
          />
        )}
      </main>

      {/* Feedback Form Modal */}
      <FeedbackForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editingFeedback={editingFeedback}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        error={createMutation.error || updateMutation.error}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs text-center">
            Hey i'm Anuj. and this is just a demo app
          </p>
        </div>
      </footer>
    </div>
  );
}

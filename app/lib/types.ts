export interface Feedback {
  id: number;
  title: string;
  description: string | null;
  status: string;
  rating: number;
  upvotes: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface ReqBody {
  title: string;
  description: string;
  rating: number;
}
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
export interface FeedbackCardProps {
  feedback: Feedback;
  onEdit: (feedback: Feedback) => void;
  onDelete: (id: number) => void;
  onUpvote: (id: number) => void;
  isDeleting?: boolean;
  onStatusUpdate: (id: number, status: string) => void;
}
export interface FeedbackListProps {
  feedbacks: Feedback[];
  onEdit: (feedback: Feedback) => void;
  onDelete: (id: number) => void;
  onUpvote: (id: number) => void;
  onStatusUpdate: (id: number, status: string) => void;
  deletingId?: number;
}

export interface UpvoteButtonProps {
  onUpvote: (id: number) => void;
  feedbackID: number;
  initial: boolean;
}

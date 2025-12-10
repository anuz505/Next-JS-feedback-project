export interface Feedback {
  id: number;
  title: String;
  description: String | null;
  rating: number;
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
  isDeleting?: boolean;
}
export interface FeedbackListProps {
  feedbacks: Feedback[];
  onEdit: (feedback: Feedback) => void;
  onDelete: (id: number) => void;
  deletingId?: number;
}

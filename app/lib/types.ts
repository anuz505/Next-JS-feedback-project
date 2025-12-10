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

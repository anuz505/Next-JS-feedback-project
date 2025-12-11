import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Feedback } from "../lib/types";
import type { APIResponse, ReqBody } from "../lib/types";

// fetches all the feedbacks
export function useFeedbacks() {
  return useQuery<Feedback[]>({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const response = await axios.get<APIResponse<Feedback[]>>(
        "/api/feedback"
      );
      return response.data.data || [];
    },
  });
}

// create a feedback
export function useCreateFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ReqBody) => {
      const response = await axios.post<APIResponse<Feedback>>(
        "/api/feedback",
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
}

// delete a feedback
export function useDeleteFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete<APIResponse<Feedback>>(
        `/api/feedback/${id}`
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
}

// update a feedback
export function useUpdateFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ReqBody }) => {
      const response = await axios.put<APIResponse<Feedback>>(
        `/api/feedback/${id}`,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
}

// upvote
export function useUpvoteFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async function (id: number) {
      const response = await axios.patch<APIResponse<Feedback>>(
        `/api/feedback/${id}/upvote`
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
}

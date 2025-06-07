import axios from "@/utils/axios";

interface Payload {
  currentPassword: string;
  newPassword: string;
}

interface ApiResponse {
  message: string;
  error: string;
}

const UpdatePassword = async (payload: Payload): Promise<ApiResponse> => {
  const response = await axios.post(`/auth/reset-password`, payload);
  return response.data as ApiResponse;
};

export default UpdatePassword;

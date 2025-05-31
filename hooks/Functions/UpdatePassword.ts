import axios from "@/utils/axios";

interface Payload {
  currentPassword: string;
  newPassword: string;
}

const UpdatePassword = async (payload: Payload) => {
  const response = await axios.post(`/auth/reset-password`, payload);
  return response.data;
};

export default UpdatePassword;

import axios from "@/utils/axios";

const DeleteTask = async (taskId: string) => {
  const response = await axios.delete(`/projects/task/delete/${taskId}`);
  return response.data;
};
export default DeleteTask;

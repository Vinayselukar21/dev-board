import axios from "@/utils/axios";

interface Payload {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  projectId: string;
  stageId: string;
  createdById: string; // should not go from frontend - task
}

const AddNewTask = async (payload: Payload) => {
  const response = await axios.post(`/projects/newtask`, payload);
  return response.data;
};

export default AddNewTask;

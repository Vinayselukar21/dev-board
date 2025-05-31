import axios from "@/utils/axios";

interface Payload {
    taskId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  projectId: string;
  stageId: string;
  assignees: string[];
}

const EditTask = async (payload: Payload) => {
  const response = await axios.put(`/projects/updatetask`, payload);
  return response.data;
};

export default EditTask;

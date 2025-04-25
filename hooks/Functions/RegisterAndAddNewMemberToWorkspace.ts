import axios from "@/utils/axios";

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: string; // "admin" | "member" | "viewer";
  workspaceId: string;
  departmentId?: string;
}
const RegisterAndAddNewMemberToWorkspace = async (
  payload: RegisterUserPayload
) => {
  const response = await axios.post(`/workspace/registerandaddmember`, payload);
  return response.data;
};

export default RegisterAndAddNewMemberToWorkspace;

import axios from "@/utils/axios";

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: string; // "admin" | "member" | "viewer";
  workspaceId?: string;
  departmentId?: string;
  organizationId: string;
  jobTitle?: string;
  contactNo?: string;
  location?: string;
}
const RegisterAndAddNewMemberToOrg = async (
  payload: RegisterUserPayload
) => {
  const response = await axios.post(`/organization/new/orgmember`, payload);
  return response.data;
};

export default RegisterAndAddNewMemberToOrg;

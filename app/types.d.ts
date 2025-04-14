export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  lastLogin?: string;
  ownedWorkspaces?: Workspace[];
  memberships?: WorkspaceMember[];
  assignedTasks?: Task[];
  Project?: Project[];
  Task?: Task[];
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner?: User;
  members?: WorkspaceMember[];
  projects?: Project[];
  departments?: Department[];
}

export interface WorkspaceMember {
  id: string;
  role: string;
  invitedAt: string;
  accepted: boolean;
  userId: string;
  workspaceId: string;
  user: User;
  workspace?: Workspace;
  departmentId?: string;
  department?: Department;
  projects?: ProjectMember[];
  // projectMembers?: ProjectMember[];
  // add workspace member designation
}

export interface ProjectMember {
  id: string;
  projectId: string;
  memberId: string;
  project: Project;
  member: WorkspaceMember;
  assignedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  workspace: Workspace;
  createdById: string;
  createdBy?: User;
  tasks?: Task[];
  taskStages?: TaskStage[];
  members?: ProjectMember[];
}

export interface TaskStage {
  id: string;
  name: string;
  createdAt: string; // or Date if you're using JS Date objects
  updatedAt: string;

  projectId: string;
  // Optionally include related project and tasks if needed
  project?: Project;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  project: Project;
  createdById: string;
  createdBy: User;
  assignees: User[];
}

export type Priority = "low" | "medium" | "high";

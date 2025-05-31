import { useAuth } from "@/app/providers/AuthProvider";
import workspaceStore from "@/store/workspaceStore";

export const activeWorkspaceDetails = () => {
    const { session } = useAuth()
    const {activeWorkspace} = workspaceStore.getState()
    const WorkspaceMemberId = session?.memberships.find((m: any) => m.workspaceId === activeWorkspace.id)?.id
    return {WorkspaceMemberId}

}
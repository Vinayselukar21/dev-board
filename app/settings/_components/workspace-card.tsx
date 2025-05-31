import { WorkspaceMember } from "@/app/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export function WorkspaceCard({
    workspace,
}: {
    workspace: WorkspaceMember[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Workspaces & Projects</CardTitle>
                <CardDescription>
                    View your workspaces & projects.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {workspace.map((workspace) => (
                    <Card key={workspace.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between gap-2">{workspace.workspace.name} <Badge variant="outline" className="text-xs">{workspace.role.name}</Badge> </CardTitle>
                            <CardDescription>
                                {workspace.workspace.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Label className="mb-2 text-sm font-medium">Projects</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {workspace.workspace.members?.[0].projects.length === 0 && (
                                <p>No projects found</p>
                            )}
                            {workspace.workspace.members?.[0].projects.map((project) => (
                                <Card key={project.id}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between gap-2">{project.project.name} <Badge variant="outline" className="text-xs">{project.project.status}</Badge></CardTitle>
                                        <CardDescription>
                                            {project.project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>

                                    </CardContent>
                                </Card>
                            ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SubTask {
    id: string;
    taskId: string;
    title: string;
    userId: string;
    adminId: string | null;
    expectedTime: number;
    requiresFeedback: boolean;
    completedAt: string | null;
    status: string;
    feedback: string | null;
    createdAt: string;
    updatedAt: string;
    assignedToUser: {
        id: string;
        name: string;
        email: string;
    };
    assignedToAdmin: null;
}

interface UpdateStatusModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    subTask: SubTask;
    onStatusUpdated?: () => void;
}

interface UpdateStatusPayload {
    taskId: string;
    userId?: string;
    adminId?: string;
    status: string;
    feedback: string;
}

// API function for updating subtask status
const updateSubTaskStatus = async (subtaskId: string, payload: UpdateStatusPayload) => {
    const response = await fetch(`https://task-management-backend-kohl-omega.vercel.app/api/subtasks/update-subtask/${subtaskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to update subtask status');
    }

    return response.json();
};

const UpdateStatusModal = ({
    isOpen,
    onOpenChange,
    subTask,
    onStatusUpdated
}: UpdateStatusModalProps) => {
    const queryClient = useQueryClient();
    const [selectedStatus, setSelectedStatus] = useState(subTask.status);
    const [feedback, setFeedback] = useState(subTask.feedback || '');
    const [assignmentType, setAssignmentType] = useState<'user' | 'admin'>('user');
    const [userId, setUserId] = useState(subTask.userId || '');
    const [adminId, setAdminId] = useState(subTask.adminId || '');

    // Reset form when subTask changes
    useEffect(() => {
        setSelectedStatus(subTask.status);
        setFeedback(subTask.feedback || '');
        setUserId(subTask.userId || '');
        setAdminId(subTask.adminId || '');
        // Set initial assignment type based on existing data
        setAssignmentType(subTask.adminId ? 'admin' : 'user');
    }, [subTask]);

    // Available status options
    const statusOptions = [
        'PENDING',
        'IN_PROGRESS',
        'COMPLETED',
        'ON_HOLD',
        'CANCELLED'
    ];

    // TanStack Query mutation for updating subtask status
    const updateStatusMutation = useMutation({
        mutationFn: (payload: UpdateStatusPayload) => updateSubTaskStatus(subTask.id, payload),
        onSuccess: (data) => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({
                queryKey: ['subtasks', subTask.taskId]
            });

            queryClient.invalidateQueries({
                queryKey: ['tasks']
            });

            // Call the callback function to notify parent
            if (onStatusUpdated) {
                onStatusUpdated();
            }

            // Show success message
            toast.success('Subtask updated successfully!');
        },
        onError: (error) => {
            console.error('Error updating subtask:', error);
            toast.error('Failed to update subtask');
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (assignmentType === 'user' && !userId.trim()) {
            toast.error('Please provide a user ID');
            return;
        }

        if (assignmentType === 'admin' && !adminId.trim()) {
            toast.error('Please provide an admin ID');
            return;
        }

        if (!feedback.trim()) {
            toast.error('Please provide feedback');
            return;
        }

        const payload: UpdateStatusPayload = {
            taskId: subTask.taskId,
            status: selectedStatus,
            feedback: feedback.trim(),
        };

        // Add either userId or adminId based on assignment type
        if (assignmentType === 'user') {
            payload.userId = userId.trim();
        } else {
            payload.adminId = adminId.trim();
        }

        updateStatusMutation.mutate(payload);
    };

    const handleCancel = () => {
        // Reset form to original values
        setSelectedStatus(subTask.status);
        setFeedback(subTask.feedback || '');
        setUserId(subTask.userId || '');
        setAdminId(subTask.adminId || '');
        setAssignmentType(subTask.adminId ? 'admin' : 'user');
        onOpenChange(false);
    };

    const hasChanges =
        selectedStatus !== subTask.status ||
        feedback !== (subTask.feedback || '') ||
        (assignmentType === 'user' && userId !== subTask.userId) ||
        (assignmentType === 'admin' && adminId !== (subTask.adminId || ''));

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Subtask</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Subtask Title (readonly) */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Subtask Title
                        </label>
                        <Input
                            value={subTask.title}
                            readOnly
                            className="bg-gray-50"
                        />
                    </div>

                    {/* Status Selection */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-2">
                            Status *
                        </label>
                        <select
                            id="status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full border rounded-md p-2 bg-white"
                            required
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status.replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Assignment Type Selection */}
                    {/* <div>
                        <label className="block text-sm font-medium mb-2">
                            Assignment Type *
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="user"
                                    checked={assignmentType === 'user'}
                                    onChange={(e) => setAssignmentType(e.target.value as 'user')}
                                    className="mr-2"
                                />
                                User
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="admin"
                                    checked={assignmentType === 'admin'}
                                    onChange={(e) => setAssignmentType(e.target.value as 'admin')}
                                    className="mr-2"
                                />
                                Admin
                            </label>
                        </div>
                    </div> */}

                    {/* User ID or Admin ID Input */}
                    {/* {assignmentType === 'user' ? (
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium mb-2">
                                User ID *
                            </label>
                            <Input
                                id="userId"
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter user ID"
                                required
                            />
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="adminId" className="block text-sm font-medium mb-2">
                                Admin ID *
                            </label>
                            <Input
                                id="adminId"
                                type="text"
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                placeholder="Enter admin ID"
                                required
                            />
                        </div>
                    )} */}

                    {/* Feedback Input */}
                    <div>
                        <label htmlFor="feedback" className="block text-sm font-medium mb-2">
                            Feedback *
                        </label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Enter feedback..."
                            className="w-full border rounded-md p-2 bg-white h-20 resize-none"
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={updateStatusMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={updateStatusMutation.isPending || !hasChanges}
                        >
                            {updateStatusMutation.isPending ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateStatusModal;
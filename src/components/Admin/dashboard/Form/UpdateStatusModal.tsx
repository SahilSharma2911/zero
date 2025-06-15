"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateStatusModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    taskId: string;
    currentStatus: string;
    onStatusUpdated?: () => void;
}

interface UpdateStatusPayload {
    status: string;
}

// API function for updating task status
const updateTaskStatus = async (taskId: string, payload: UpdateStatusPayload) => {
    const response = await fetch(`https://task-management-backend-kohl-omega.vercel.app/api/tasks/update-task/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to update task status');
    }

    return response.json();
};

const UpdateStatusModal = ({
    isOpen,
    onOpenChange,
    taskId,
    currentStatus,
    onStatusUpdated
}: UpdateStatusModalProps) => {
    const queryClient = useQueryClient();
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    // Available status options (you can change these in future)
    const statusOptions = [
        'PENDING',
        'IN_PROGRESS',
        'COMPLETED',
        'ON_HOLD',
        'CANCELLED'
    ];

    // TanStack Query mutation for updating task status
    const updateStatusMutation = useMutation({
        mutationFn: (payload: UpdateStatusPayload) => updateTaskStatus(taskId, payload),
        onSuccess: (data) => {
            // Invalidate and refetch relevant queries
            queryClient.invalidateQueries({
                queryKey: ['subtasks', taskId]
            });

            queryClient.invalidateQueries({
                queryKey: ['tasks']
            });

            // Call the callback function to notify parent
            if (onStatusUpdated) {
                onStatusUpdated();
            }

            // Close modal and show success message
            onOpenChange(false);
            toast.success('Task status updated successfully!');
        },
        onError: (error) => {
            console.error('Error updating task status:', error);
            toast.error('Failed to update task status');
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedStatus === currentStatus) {
            toast.info('No changes to save');
            onOpenChange(false);
            return;
        }

        const payload: UpdateStatusPayload = {
            status: selectedStatus
        };

        updateStatusMutation.mutate(payload);
    };

    const handleCancel = () => {
        setSelectedStatus(currentStatus); // Reset to original status
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Update Task Status</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full border rounded-md p-2 bg-white"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status.replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                    </div>

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
                            disabled={updateStatusMutation.isPending || selectedStatus === currentStatus}
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
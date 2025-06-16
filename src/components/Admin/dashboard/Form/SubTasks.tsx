"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Edit } from "lucide-react";
import { useState } from "react";
import AddSubTaskModal from "./AddSubTaskModal";
import UpdateStatusModal from "./UpdateStatusModal";
import { useQuery } from "@tanstack/react-query";

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

interface SubTasksProps {
  taskId: string;
}

const fetchSubTasks = async (taskId: string): Promise<SubTask[]> => {
  const response = await fetch(
    `https://task-management-backend-kohl-omega.vercel.app/api/tasks/get-task/${taskId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch subtasks');
  }
  const result = await response.json();
  return result.data.subtasks || [];
};

const SubTasks: React.FC<SubTasksProps> = ({ taskId }) => {
  const { data: subTasks, isLoading, error, refetch } = useQuery({
    queryKey: ['subtasks', taskId],
    queryFn: () => fetchSubTasks(taskId),
    enabled: !!taskId,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedSubTaskForStatusUpdate, setSelectedSubTaskForStatusUpdate] = useState<SubTask | null>(null);

  // Simple callback to refresh data after successful creation
  const handleSubTaskCreated = () => {
    refetch();
    setIsModalOpen(false);
  };

  // Callback to refresh data after status update
  const handleStatusUpdated = () => {
    refetch();
    setSelectedSubTaskForStatusUpdate(null);
    setIsStatusModalOpen(false);
  };

  const handleDeleteSubTask = async (subtaskId: string) => {
    try {
      const response = await fetch(
        `https://task-management-backend-kohl-omega.vercel.app/api/subtasks/delete-subtask/${subtaskId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete subtask');
      }

      await refetch();
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  const handleToggleCompletion = async (subtaskId: string, currentStatus: string, subTask: SubTask) => {
    const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';

    try {
      const response = await fetch(
        `http://localhost:8000/api/subtasks/update-subtask/${subtaskId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskId: subTask.taskId,
            userId: subTask.userId,
            status: newStatus,
            feedback: subTask.feedback || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update subtask');
      }

      await refetch();
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  };

  const handleOpenStatusModal = (subTask: SubTask) => {
    setSelectedSubTaskForStatusUpdate(subTask);
    setIsStatusModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-400 hover:bg-green-500';
      case 'IN_PROGRESS':
        return 'bg-blue-400 hover:bg-blue-500';
      case 'ON_HOLD':
        return 'bg-yellow-400 hover:bg-yellow-500';
      case 'CANCELLED':
        return 'bg-red-400 hover:bg-red-500';
      default:
        return 'bg-gray-400 hover:bg-gray-500';
    }
  };

  if (isLoading) {
    return <div>Loading subtasks...</div>;
  }

  if (error) {
    return <div>Error loading subtasks: {error.message}</div>;
  }

  return (
    <div className="mt-6 py-1">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Subtasks</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Subtask
        </Button>
      </div>

      {subTasks && subTasks.length > 0 ? (
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableCell className="text-text">Title</TableCell>
              <TableCell className="text-text">Assigned To</TableCell>
              {/* <TableCell className="text-text">Feedback Required</TableCell> */}
              <TableCell className="text-text">Time (hours)</TableCell>
              <TableCell className="text-text">Status</TableCell>
              <TableCell className="text-text">Feedback</TableCell>
              {/* <TableCell className="text-text">Action</TableCell> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {subTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="flex-1">
                  <Input
                    value={task.title}
                    readOnly
                    className="p-2 w-[150px] placeholder:text-text"
                  />
                </TableCell>

                <TableCell className="flex-1">
                  <div className="flex items-center gap-2">
                    {task.assignedToUser ? (
                      <>
                        <span>{task.assignedToUser.name}</span>
                        <span className="text-sm text-gray-500">({task.assignedToUser.email})</span>
                      </>
                    ) : (
                      <span>Unassigned</span>
                    )}
                  </div>
                </TableCell>

                {/* <TableCell className="flex-1">
                  <Checkbox
                    checked={task.requiresFeedback}
                    disabled
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </TableCell> */}

                <TableCell className="flex-1">
                  <div className="flex items-center gap-1 text-text">
                    <span>{task.expectedTime}</span>
                    <span className="text-sm">hours</span>
                  </div>
                </TableCell>

                <TableCell className="flex-1">
                  <div className="flex items-center gap-2">
                    <button
                      className={`${getStatusColor(task.status)} text-white rounded hover:cursor-pointer px-3 py-1 text-sm`}
                      onClick={() => handleOpenStatusModal(task)}
                    >
                      {task.status}
                    </button>
                  </div>
                </TableCell>

                <TableCell className="flex-1">
                  <div className="text-sm text-gray-600 max-w-[100px] truncate">
                    {task.feedback || 'No feedback'}
                  </div>
                </TableCell>

                {/* <TableCell className="flex-1">
                  <div className="flex gap-2">
                    <Checkbox
                      checked={task.status === 'COMPLETED'}
                      onCheckedChange={() => handleToggleCompletion(task.id, task.status, task)}
                      className="h-5 w-5 rounded border-gray-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSubTask(task.id)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No subtasks found. Add a subtask to get started.
        </div>
      )}

      <AddSubTaskModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubTaskCreated={handleSubTaskCreated}
        taskId={taskId}
      />

      {selectedSubTaskForStatusUpdate && (
        <UpdateStatusModal
          isOpen={isStatusModalOpen}
          onOpenChange={setIsStatusModalOpen}
          subTask={selectedSubTaskForStatusUpdate}
          onStatusUpdated={handleStatusUpdated}
        />
      )}
    </div>
  );
};

export default SubTasks;
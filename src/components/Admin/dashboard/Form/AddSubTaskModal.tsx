"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useAppContext } from "@/Context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddSubTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubTaskCreated: () => void; // Changed from onAddSubTask
  taskId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateSubTaskPayload {
  taskId: string;
  title: string;
  userId: string;
  expectedTime: number;
  requiresFeedback: boolean;
}

// API function for creating subtask
const createSubTask = async (payload: CreateSubTaskPayload) => {
  const response = await fetch('https://task-management-backend-kohl-omega.vercel.app/api/subtasks/create-subtask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create subtask');
  }

  return response.json();
};

const AddSubTaskModal = ({ isOpen, onOpenChange, onSubTaskCreated, taskId }: AddSubTaskModalProps) => {
  const { cookieData } = useAppContext();
  const queryClient = useQueryClient();

  const [taskData, setTaskData] = useState({
    title: '',
    expectedTime: 6,
    requiresFeedback: true,
    userId: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // TanStack Query mutation for creating subtask
  const createSubTaskMutation = useMutation({
    mutationFn: createSubTask,
    onSuccess: (data) => {
      // Invalidate and refetch the specific task query
      queryClient.invalidateQueries({
        queryKey: ['subtasks', taskId]
      });

      // Call the callback function to notify parent
      onSubTaskCreated();

      // Reset form
      setTaskData({
        title: '',
        expectedTime: 6,
        requiresFeedback: true,
        userId: '',
      });

      toast.success('Subtask created successfully!');
    },
    onError: (error) => {
      console.error('Error creating subtask:', error);
      toast.error('Failed to create subtask');
    }
  });

  useEffect(() => {
    if (isOpen && cookieData?.id) {
      fetchUsers();
    }
  }, [isOpen, cookieData?.id]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch(
        `https://task-management-backend-kohl-omega.vercel.app/api/auth/company-users/${cookieData.id}?search=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleUserSelect = (userId: string) => {
    setTaskData(prev => ({
      ...prev,
      userId
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskData.userId) {
      toast.error('Please select a user');
      return;
    }

    const payload: CreateSubTaskPayload = {
      taskId,
      title: taskData.title,
      userId: taskData.userId,
      expectedTime: taskData.expectedTime,
      requiresFeedback: taskData.requiresFeedback
    };

    // Use the mutation - this is the ONLY API call now
    createSubTaskMutation.mutate(payload);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-2 flex items-center gap-2">
          <Plus size={16} />
          Add Subtask
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Subtask</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title*
            </label>
            <Input
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter subtask title"
            />
          </div>

          <div>
            <label htmlFor="expectedTime" className="block text-sm font-medium mb-1">
              Expected Time (hours)*
            </label>
            <select
              id="expectedTime"
              name="expectedTime"
              value={taskData.expectedTime}
              onChange={handleSelectChange}
              className="border rounded-md p-2 w-full"
              required
            >
              {[1, 2, 3, 4, 5, 6].map((hour) => (
                <option key={hour} value={hour}>
                  {hour} hour{hour !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="requiresFeedback"
              name="requiresFeedback"
              checked={taskData.requiresFeedback}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded"
            />
            <label htmlFor="requiresFeedback" className="text-sm font-medium">
              Requires Feedback
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">
              Assign to User*
            </label>

            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1"
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>

            {loadingUsers ? (
              <div className="text-center py-4">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-4 text-sm text-gray-500">
                No users found
              </div>
            ) : (
              <div className="border rounded-md max-h-60 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user.id)}
                    className={`p-3 cursor-pointer hover:bg-gray-100 ${taskData.userId === user.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                      }`}
                  >
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createSubTaskMutation.isPending}
            >
              {createSubTaskMutation.isPending ? 'Creating...' : 'Create Subtask'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubTaskModal;
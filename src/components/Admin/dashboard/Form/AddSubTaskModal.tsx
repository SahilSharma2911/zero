"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

interface AddSubTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSubTask: (task: {
    taskId: string;
    title: string;
    userId: string;
    expectedTime: number;
    requiresFeedback: boolean;
  }) => void;
  taskId: string;
}

const DEFAULT_USER_ID = "afc709e1-dbbb-4fa9-a862-3c0e27dcb5ba";

const AddSubTaskModal = ({ isOpen, onOpenChange, onAddSubTask, taskId }: AddSubTaskModalProps) => {
  const [taskData, setTaskData] = useState({
    title: '',
    expectedTime: 6, // Default to 6 hours
    requiresFeedback: true, // Default to true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      taskId,
      title: taskData.title,
      userId: DEFAULT_USER_ID,
      expectedTime: taskData.expectedTime,
      requiresFeedback: taskData.requiresFeedback
    };

    try {
      // Log the payload to console (for testing)
      console.log('Submitting subtask:', payload);

      // Call the API
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

      const result = await response.json();
      console.log('Subtask created:', result);

      // Call the parent component's handler
      onAddSubTask(payload);
      
      // Reset form and close modal
      setTaskData({
        title: '',
        expectedTime: 6,
        requiresFeedback: true,
      });
      onOpenChange(false);

      // Show success message
      toast.success('Subtask created successfully!');
    } catch (error) {
      console.error('Error creating subtask:', error);
      toast.error('Failed to create subtask');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-2 flex items-center gap-2">
          <Plus size={16} />
          Add Subtask
        </Button>
      </DialogTrigger>
      <DialogContent>
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

          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>Assigned to:</strong> Default User (ID: {DEFAULT_USER_ID})
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Subtask</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubTaskModal;
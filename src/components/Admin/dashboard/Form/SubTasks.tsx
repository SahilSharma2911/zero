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
import { Plus, Search, UserPlus, X } from "lucide-react";
import useFormData from "../hooks/useFormData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AddSubTaskModal from "./AddSubTaskModal";

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

interface SubTasksProps {
  taskId: string;
}

const SubTasks: React.FC<SubTasksProps> = ({ taskId }) => {
  //--------------custom hook----------------
  const { subTasksData } = useFormData();

  const [localTasks, setLocalTasks] = useState(subTasksData?.subTasks || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update local state when hook data changes
  useEffect(() => {
    if (subTasksData?.subTasks) {
      setLocalTasks(subTasksData.subTasks);
    }
  }, [subTasksData?.subTasks]);

  const subTasks = localTasks;
  const removeSubTask = subTasksData?.removeSubTask;
  const addSubTask = subTasksData?.addSubTask;
  const selectedFeedback = subTasksData?.selectedFeedback;
  const setAssignTo = subTasksData?.setAssignTo;
  const setTaskName = subTasksData?.setTaskName;
  const toggleSubTaskCompletion = subTasksData?.toggleSubTaskCompletion;

  const handleAddSubTask = async (subtaskData: {
    taskId: string;
    title: string;
    userId: string;
    expectedTime: number;
    requiresFeedback: boolean;
  }) => {
    console.log('Adding subtask:', subtaskData);
    if (addSubTask) {
      addSubTask(subtaskData);
    }
  };
  return (
    <div className="mt-6 py-1">
      <h2 className="text-lg font-medium mb-2">Subtasks</h2>
      <Table className="relative">
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableCell className="text-text">Name</TableCell>
            <TableCell className="text-text">Assign to</TableCell>
            <TableCell className="text-text">Feedback</TableCell>
            <TableCell className="text-text">Time</TableCell>
            <TableCell className="text-text">Status</TableCell>
            <TableCell className="text-text">Action</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subTasks?.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="flex-1">
                <Input
                  value={task.name || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    console.log('Input change:', newValue, 'Task ID:', task.id);

                    // Update local state immediately for responsiveness
                    setLocalTasks(prev => prev.map(t =>
                      t.id === task.id ? { ...t, name: newValue } : t
                    ));

                    // Call the hook function with just the new value
                    if (setTaskName) {
                      try {
                        setTaskName(newValue);
                      } catch (error) {
                        console.log('Error calling setTaskName:', error);
                      }
                    }
                  }}
                  className="p-2 w-[150px] placeholder:text-text"
                  placeholder="Task Name"
                />
              </TableCell>

              {/*----------------- assign to ----------------- */}
              <TableCell className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:cursor-pointer"
                    >
                      <UserPlus className="text-text" size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <motion.div
                      variants={popupVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 flex-col w-full"
                    >
                      <div className="relative">
                        <Search className="absolute top-1/2 -translate-y-1/2 left-2 text-text" size={16} />
                        <input
                          placeholder="Search by email"
                          type="email"
                          onChange={(e) => setAssignTo && setAssignTo(e.target.value)}
                          className="border rounded-md p-2 pl-10 w-full"
                        />
                      </div>
                      <div>
                        <div className="hover:bg-gray-100 p-2 rounded-md hover:cursor-pointer flex items-center gap-2 text-text">
                          <span>
                            <UserPlus size={16} />
                          </span>
                          Invite people via email
                        </div>
                      </div>
                    </motion.div>
                  </PopoverContent>
                </Popover>
              </TableCell>

              {/*---------------------- checkbox -------------------- */}
              <TableCell className="flex-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={task.completed || false}
                    onCheckedChange={() => toggleSubTaskCompletion && toggleSubTaskCompletion(task.id)}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                  {selectedFeedback?.length > 0 && (
                    <div className="flex items-center gap-1">
                      <div className={`border size-3 ${selectedFeedback[0].color}`}></div>
                      <span className="text-sm">{selectedFeedback[0].name}</span>
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell className="flex-1">
                <div className="flex items-center gap-1 text-text">
                  <select name="hour" id={`hour-${task.id}`} className="appearance-none border rounded p-1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                  <span className="text-sm">Hour</span>
                </div>
              </TableCell>

              <TableCell className="flex-1">
                <button className="bg-red-400 hover:bg-red-500 text-white rounded hover:cursor-pointer px-3 py-1 text-sm">
                  {task.completed ? "Completed" : "Start"}
                </button>
              </TableCell>

              <TableCell className="flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSubTask && removeSubTask(task.id)}
                >
                  <X size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddSubTaskModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddSubTask={handleAddSubTask}
        taskId={taskId}
      />
    </div>
  );
};

export default SubTasks;
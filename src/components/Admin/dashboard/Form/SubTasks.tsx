import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Plus, Search, UserPlus, X } from "lucide-react";
import useFormData from "../hooks/useFormData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const SubTasks = () => {
  //--------------custom hook----------------

  const { subTasksData } = useFormData();

  const subTasks = subTasksData?.subTasks;
  const removeSubTask = subTasksData?.removeSubTask;
  const addSubTask = subTasksData?.addSubTask;
  const allFeedbacks = subTasksData?.availableFeedback;
  const selectedFeedback = subTasksData?.selectedFeedback;
  const handleFeedbackChange = subTasksData?.handleFeedbackChange;
  const setAssignTo = subTasksData?.setAssignTo;
  const setTaskName = subTasksData?.setTaskName;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-2">Subtasks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="text-text">Name</TableCell>
            <TableCell className="text-text">Assign to</TableCell>
            <TableCell className="text-text">Feedback</TableCell>
            <TableCell className="text-text">Time</TableCell>
            <TableCell className="text-text">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Input
                  value={task.name}
                  onChange={(e) =>setTaskName(e.target.value) }
                  className="p-2 w-[150px] placeholder:text-text"
                  placeholder="Task Name"
                />
              </TableCell>

              {/*----------------- assign to ----------------- */}

              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className=" hover:cursor-pointer"
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
                      className="flex gap-2 flex-col w-full "
                    >
                      <div className=" relative">
                        <Search className=" absolute top-1/2 -translate-y-1/2 left-2 text-text" />
                        <input
                          placeholder="Search by email"
                          type="email"
                          onChange={(e) => setAssignTo(e.target.value)}
                          className=" !border rounded-md p-2 pl-10 w-full"
                        />
                      </div>
                      <div>
                        <div className=" hover:bg-gray-100 p-2 rounded-md hover:cursor-pointer flex items-center gap-2 text-text">
                          <span>
                            <UserPlus />
                          </span>
                          Invite people via email
                        </div>
                      </div>
                    </motion.div>
                  </PopoverContent>
                </Popover>
              </TableCell>

              {/*---------------------- feedback -------------------- */}
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    {selectedFeedback.length > 0 ? (
                      <div>
                        {selectedFeedback.map((feedback) => {
                          return (
                            <div
                              key={feedback.id}
                              className=" flex items-center gap-2 hover:bg-gray-100 p-1 hover:cursor-pointer"
                            >
                              <div
                                className={` border size-3 ${feedback.color}`}
                              ></div>
                              <span>{feedback.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className=" hover:cursor-pointer"
                      >
                        <CheckCircle size={16} />
                      </Button>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-fit">
                    <motion.div
                      variants={popupVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 flex-col w-fit"
                    >
                      {allFeedbacks.map((feedback) => {
                        return (
                          <div
                            key={feedback.id}
                            onClick={() => handleFeedbackChange(feedback)}
                            className=" flex items-center gap-2 hover:bg-gray-100 p-1 hover:cursor-pointer"
                          >
                            <div
                              className={` border size-3 ${feedback.color}`}
                            ></div>
                            <span>{feedback.name}</span>
                          </div>
                        );
                      })}
                    </motion.div>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-text">
                  <div className="border border-text rounded-sm w-8 h-5"></div>
                  Hour
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSubTask(task.id)}
                >
                  <X size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {subTasks.length < 2 && (
        <Button
          variant="outline"
          className="mt-2 flex items-center gap-2"
          onClick={addSubTask}
        >
          <Plus size={16} />
          Add Subtask
        </Button>
      )}
    </div>
  );
};

export default SubTasks;

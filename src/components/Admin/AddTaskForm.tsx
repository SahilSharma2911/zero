"use client";

import Image from "next/image";
import React, { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { CalendarIcon, CheckCircle, Plus, Tag, UserPlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { Textarea } from "../ui/textarea";
import { CgAttachment } from "react-icons/cg";
import { format } from "date-fns";

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

type SubTask = {
  id: string;
  name: string;
  assignedTo: string;
  feedback: boolean;
  time: string;
};

type TagType = {
  id: string;
  name: string;
  color: string;
};

const AddTaskForm = () => {
  const [openTag, setOpenTag] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  const availableTags: TagType[] = [
    { id: '1', name: 'Tag 1', color: 'bg-blue-100 text-blue-800' },
    { id: '2', name: 'Tag 2', color: 'bg-green-100 text-green-800' },
    { id: '3', name: 'Tag 3', color: 'bg-purple-100 text-purple-800' },
  ];

  // Handle date selection and auto-close calendar
  const handleDateSelect = useCallback((selectedDate: Date | undefined) => {
    setDate(selectedDate);
  }, []);

  // Add new subtask
  const addSubTask = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    const newSubTask: SubTask = {
      id: Date.now().toString(),
      name: "",
      assignedTo: "",
      feedback: false,
      time: "1 hour",
    };
    setSubTasks((prev) => [...prev, newSubTask]);
  }, []);

  // Update subtask field
  const updateSubTask = useCallback(
    (id: string, field: keyof SubTask, value: string | boolean) => {
      setSubTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, [field]: value } : task
        )
      );
    },
    []
  );

  // Remove subtask
  const removeSubTask = useCallback((id: string) => {
    setSubTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // Handle tag selection
  const handleTagSelect = useCallback((tag: TagType) => {
    setSelectedTags(prev => {
      // If tag is already selected, remove it
      if (prev.some(t => t.id === tag.id)) {
        return prev.filter(t => t.id !== tag.id);
      }
      // Otherwise add it
      return [...prev, tag];
    });
    // Don't close the popover after selection
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/assignlogo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-14 h-14 rounded-full"
          />
          <span className="font-bold">Example Task 1</span>
        </div>
        <Button variant="ghost" className="text-text hover:bg-transparent">
          <X />
        </Button>
      </div>

      <form className="mt-3">
        {/* Tags Section */}
        <div className="flex gap-2 items-center flex-wrap">
          {/* Selected Tags */}
          {selectedTags.map(tag => (
            <span 
              key={tag.id}
              className={`px-2 py-1 rounded-full text-xs ${tag.color}`}
            >
              {tag.name}
            </span>
          ))}
          
          {/* Tag Selector */}
          <Popover open={openTag} onOpenChange={setOpenTag}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-200 text-text hover:bg-gray-300 flex gap-2"
              >
                <Tag size={16} />
                Tags
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2}}
                className="flex gap-2 flex-col"
              >
                {availableTags.map(tag => (
                  <Button 
                    key={tag.id}
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      handleTagSelect(tag);
                    }}
                    className={`${selectedTags.some(t => t.id === tag.id) ? 'bg-gray-100' : ''}`}
                  >
                    {tag.name}
                  </Button>
                ))}
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Due Date Section */}
        <div className="mt-4 text-text">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-0">
                <CalendarIcon size={16} />
                {date ? format(date, "PPP") : "Due Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Subtasks Section */}
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
                      onChange={(e) =>
                        updateSubTask(task.id, "name", e.target.value)
                      }
                      className="p-2 w-[150px] placeholder:text-text"
                      placeholder="Task Name"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <UserPlus className="text-text" size={16} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateSubTask(task.id, "feedback", !task.feedback)
                      }
                    >
                      <CheckCircle
                        className={`text-text ${
                          task.feedback ? "text-green-500" : ""
                        }`}
                        size={16}
                      />
                    </Button>
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

        {/* Description Section */}
        <div className="mt-6">
          <label className="text-text block mb-2">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description goes here..."
            className="min-h-[100px]"
          />
        </div>

        {/* Attachment Section */}
        <div className="flex mt-4 items-center gap-2 text-text">
          <CgAttachment className="rotate-45" size={18} />
          <span className="text-sm">Attachment</span>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
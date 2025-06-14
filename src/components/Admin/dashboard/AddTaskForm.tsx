/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "../../ui/button";
import { CalendarIcon, Tags, X } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { CgAttachment, CgClose } from "react-icons/cg";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useAppContext } from "@/Context/AppContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import useGetTags from "@/components/hooks/useGetTags";

type TagType = {
  id: string;
  name: string;
  color: string;
};

interface TaskFormValues {
  title: string;
  description: string;
  dueDate?: Date;
  tags: string[];
  attachments: File[];
}

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};



const AddTaskForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { adminData } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const{allTags} = useGetTags()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: "Example Task 1",
      description: "",
      tags: [],
      attachments: [],
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    const toastId = toast.loading("Creating task...");

    try {
      const formData = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        adminId: adminData.role === "admin" ? null : adminData.id,
        userId: adminData.role === "admin" ? adminData.id : null,
        tagIds: data.tags,
        attachments: ["https://cdn.example.com/doc1.pdf", "https://cdn.example.com/image1.png"],
      };

      console.log("formDAta of task is ",formData)

      // Submit to API
      const response = await axios.post(
        "https://task-management-backend-kohl-omega.vercel.app/api/tasks/create-task",
        formData
      );

      console.log("task is created successfully ", response);

      toast.success("Task created successfully!", { id: toastId });
      setOpen(false);
    } catch (error: any) {
      console.error("Error creating task:", error);
      toast.error(error.response?.data?.message || "Failed to create task", {
        id: toastId,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setValue("attachments", [...watch("attachments"), ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedAttachments = [...watch("attachments")];
    updatedAttachments.splice(index, 1);
    setValue("attachments", updatedAttachments);
  };

  const handleTagSelect = (tag: TagType) => {
    const currentTags = watch("tags");
    if (currentTags.includes(tag.id)) {
      setValue(
        "tags",
        currentTags.filter((t) => t !== tag.id)
      );
    } else {
      setValue("tags", [...currentTags, tag.id]);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setValue(
      "tags",
      watch("tags").filter((t) => t !== tagId)
    );
  };

  const selectedTags = watch("tags");
  const attachments = watch("attachments");
  const dueDate = watch("dueDate");

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
         
        </div>
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          className="text-text hover:cursor-pointer hover:bg-transparent"
        >
          <X />
        </Button>
      </div>

      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title.message}</span>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Section */}
        <div className="my-6">
          <label className="text-text block mb-2">Title</label>
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="title"
            
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Tags Section */}
        <div className="flex gap-2 items-center flex-wrap">
          {selectedTags.map((tagId) => {
            const tag = allTags.find((t) => t.id === tagId);
            return tag ? (
              <div key={tag.id} className="relative inline-block m-1 group">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${tag.color} relative`}
                >
                  {tag.name}
                  <CgClose
                    className="absolute -top-2 text-lg text-black cursor-pointer 
                    opacity-0 group-hover:opacity-100 transition-opacity
                    bg-white rounded-full p-0.5 shadow-sm"
                    onClick={() => handleRemoveTag(tag.id)}
                  />
                </span>
              </div>
            ) : null;
          })}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-200 text-text hover:bg-gray-300 flex gap-2"
              >
                <Tags size={16} />
                Tags
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="flex gap-2"
              >
                {allTags.map((tag) => (
                  <Button
                    key={tag.id}
                    variant="outline"
                    disabled={selectedTags.includes(tag.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTagSelect(tag);
                    }}
                  >
                    {tag.name}
                  </Button>
                ))}
              </motion.div>
            </PopoverContent>
          </Popover>
          {errors.tags && (
            <span className="text-red-500 text-sm">
              {errors.tags.message}
            </span>
          )}
        </div>

        {/* Due Date Section */}
        <div className="mt-4 text-text">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-0">
                <CalendarIcon size={16} />
                {dueDate ? format(dueDate, "PPP") : "Due Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={(date) => setValue("dueDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dueDate && (
            <span className="text-red-500 text-sm">
              {errors.dueDate.message}
            </span>
          )}
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <label className="text-text block mb-2">Description</label>
          <Textarea
            {...register("description", {
              required: "description is required",
            })}
            placeholder="Task description goes here..."
            className="min-h-[100px]"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Attachment Section */}
        <div className="mt-4">
          <div
            className="flex items-center gap-2 text-text cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <CgAttachment className="rotate-45" size={18} />
            <span className="text-sm">Attachment</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              disabled={attachments.length >= 4}
            />
          </div>

          <div className="mt-2 space-y-2  ">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="hover:cursor-pointer bg-[#F8F9FAFF] text-text hover:bg-[#dfecfa]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="hover:cursor-pointer bg-lightBtn hover:bg-darkBlueBtn"
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;

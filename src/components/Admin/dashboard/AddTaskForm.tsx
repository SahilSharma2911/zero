"use client";

import Image from "next/image";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { CgAttachment } from "react-icons/cg";
import Tag from "./Form/Tag";
import DueDate from "./Form/DueDate";
import SubTasks from "./Form/SubTasks";

interface Attachment {
  file: File;
  addedAt: Date;
}

const AddTaskForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        addedAt: new Date()
      }));
      const updatedAttachments = [...attachments, ...newFiles].slice(0, 4); // Limit to 4 files
      setAttachments(updatedAttachments);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const formatTimeAgo = (date: Date) => {
    const diffInMinutes = Math.floor((currentTime.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes === 1) return "1 minute ago";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };
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
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          className="text-text hover:cursor-pointer hover:bg-transparent"
        >
          <X />
        </Button>
      </div>

      <form className="mt-3">
        {/*------------------ Tags Section------------------- */}
        <Tag />

        {/*---------------------- Due Date Section------------------- */}
        <DueDate />

        {/* Subtasks Section */}
        <SubTasks />

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
        <div className="mt-4">
          <div 
            className="flex items-center gap-2 text-text cursor-pointer"
            onClick={handleAttachmentClick}
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

          {/* Attachments list */}
          <div className="mt-2  space-y-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">
                    {file.file.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTimeAgo(file.addedAt)}
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
      </form>
    </div>
  );
};

export default AddTaskForm;
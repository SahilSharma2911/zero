"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

import { Textarea } from "../../ui/textarea";
import { CgAttachment } from "react-icons/cg";
import Tag from "./Form/Tag";
import DueDate from "./Form/DueDate";
import SubTasks from "./Form/SubTasks";

const AddTaskForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [description, setDescription] = useState("");

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
        <div className="flex mt-4 items-center gap-2 text-text">
          <CgAttachment className="rotate-45" size={18} />
          <span className="text-sm">Attachment</span>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;

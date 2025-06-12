"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddUserForm from "./AddUserForm";
import Popup from "@/components/Modal/Popup";
// import Popup from '@/components/Modal/Popup';

const UserBar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className=" flex justify-between items-center px-8 ">
        {/*------------------- left side section ------------------  */}
        <div className=" flex items-center gap-2">
          {/*--------------- dropdown-----------------  */}
          <div>
            <Select>
              <SelectTrigger className="w-[180px] hover:cursor-pointer">
                <SelectValue
                  placeholder="Select Task"
                  className="text-black text-xl"
                />
              </SelectTrigger>
              <SelectContent className=" hover:cursor-pointer">
                <SelectGroup>
                  <SelectItem value="Created Task">Created Task</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* -------------- Add task btn ------------------  */}
          <Button
            onClick={() => setOpen(true)}
            className=" bg-lightBtn hover:bg-darkBlueBtn hover:scale-95 hover:cursor-pointer"
          >
            <Plus />
            Add task
          </Button>
        </div>

        {/*------------------- right side section ------------------  */}
          <div className=" flex relative">
            <Search className=" absolute top-1/2 -translate-y-1/2 left-2 text-text" />
            <Input
              placeholder="Search by email"
              type="email"
              className=" !border rounded-md p-2 pl-10 w-full"
            />
          </div>
      </div>

      {/*------------------Add task Pop up -------------------  */}

      <Popup openModal={open} content={<AddUserForm setOpen={setOpen} />} />
    </>
  );
};

export default UserBar;

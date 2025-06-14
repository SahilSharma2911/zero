"use client";

import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../ui/select";
import { Button } from "../../ui/button";
import { Funnel, Plus, SortDescIcon, Table, User } from "lucide-react";
import { FaEllipsisH } from "react-icons/fa";
import Popup from "../../Modal/Popup";
import AddTaskForm from "./AddTaskForm";

const DashboardBar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className=" flex justify-between items-center px-8">
        {/*------------------- left side section ------------------  */}
        <div className=" flex items-center gap-8">
          {/*--------------- dropdown-----------------  */}
          <div >

            <h2  className=' font-bold text-xl'>Created Task</h2>
            {/* <Select>
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
            </Select> */}
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
        <div className=" flex items-center justify-between gap-4">
          {/*------------------ tickets ------------ */}

          <Button className="  !bg-transparent hover:bg-transparent text-text hover:scale-95 hover:cursor-pointer">
            <User />
            <span>My tickets</span>
          </Button>

          {/*------------------- Filters --------------------- */}

          <Button className=" !bg-transparent hover:bg-transparent text-text hover:scale-95 hover:cursor-pointer">
            <Funnel />
            <span>Filter</span>
          </Button>

          {/*----------------- Sort -------------------------- */}
          <Button className=" !bg-transparent hover:bg-transparent text-text hover:scale-95 hover:cursor-pointer">
            <SortDescIcon />
            <span>Filter</span>
          </Button>

          {/*----------------- Table -------------------------- */}
          <Button className=" !bg-transparent hover:bg-transparent text-text hover:scale-95 hover:cursor-pointer">
            <Table />
            <span>Table</span>
          </Button>

          {/*----------------- Ellipsis -------------------------- */}
          <FaEllipsisH className=" text-2xl text-text hover:cursor-pointer" />
        </div>
      </div>

      {/*------------------Add task Pop up -------------------  */}

      <Popup openModal={open} content={<AddTaskForm setOpen={setOpen} />} />
    </>
  );
};

export default DashboardBar;

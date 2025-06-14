/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { userTableData, userTableDataProps } from "@/assets/Data";
import TableComponent from "@/components/TableComponent";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
interface columnsProps {
  header: string;
  accessor: string;
  classes?: string;
}

const columns: columnsProps[] = [
  {
    header:"",
    accessor: "image",
    classes: "hidden md:table-cell text-center",
  },
  {
    header: "Name",
    accessor: "name",
    classes: "font-bold text-md text-text",
  },
  {
    header: "Email",
    accessor: "email",
    classes: "hidden md:table-cell font-bold text-md text-text ",
  },
  {
    header: "Priority",
    accessor: "priority",
    classes: "hidden lg:table-cell font-bold text-md text-text text-center",
  },
  {
    header: "Team Members",
    accessor: "teamMembers",
    classes: "hidden lg:table-cell font-bold text-md text-text text-center",
  },
  {
    header: "Actions",
    accessor: "dueDate",
    classes: "font-bold text-md text-text text-center",
  },
];

const UsersTable = () => {

  const[btnState ,setBtnState] = useState('activate')


  const renderRow = (item: userTableDataProps) => (
    <TableRow
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <TableCell className="hidden md:table-cell  ">
        <div className="w-3 h-3 rounded-full bg-green-500 "></div>
      </TableCell>

      <TableCell className="flex items-center gap-4  ">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell  ">{item.email}</TableCell>
      <TableCell className="hidden md:table-cell text-center ">{item.priority}</TableCell>
      <TableCell className="hidden md:table-cell text-center">{item.teamMembers}</TableCell>

      <TableCell className=" text-center">
        <div>
          <div className=" flex gap-4 items-center justify-center">
            <button className=" bg-green-500 text-white text-xs rounded p-1">
            {btnState}
          </button>
           <button className=" bg-transparent border border-[#513600FF] hover:bg-red-500 hover:text-white hover:cursor-pointer font-medium  text-[#513600FF] text-xs rounded p-1">
            Delete
          </button>
           <button className=" text-text text-2xl hover:font-bold hover:cursor-pointer" >
            <CiEdit/>
          </button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );


  return (
    <div className="bg-[#fafafbe9] p-1 rounded-md mt-10">
      {userTableData.length <= 0 ? (
        <div className="text-center text-gray-500 h-64">No Users Found</div>
      ) : (
        <TableComponent
          columns={columns}
          data={userTableData}
          renderRow={renderRow}
        />
      )}
    </div>
  );
};

export default UsersTable;

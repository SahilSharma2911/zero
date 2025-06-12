"use client"

import { userTableData, userTableDataProps } from "@/assets/Data";
import TableComponent from "@/components/TableComponent";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useState } from "react";

interface columnsProps {
  header: string;
  accessor: string;
  classes?: string;
}

const columns: columnsProps[] = [
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
          <button className=" bg-green-500 text-white text-xs rounded p-1">
            {btnState}
          </button>
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

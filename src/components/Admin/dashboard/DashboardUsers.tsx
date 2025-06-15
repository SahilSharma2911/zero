"use client"

import React from "react";
import TableComponent from "../../TableComponent";
import { TableCell, TableRow } from "../../ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useGetTasks from "@/components/hooks/useGetTasks";
import { TaskProps } from "@/types/type";
import assginBy from './../../../../public/images/assignlogo.png'

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
    header: "Assign by",
    accessor: "assignBy",
    classes: "hidden md:table-cell font-bold text-md text-text text-center",
  },
  {
    header: "Action",
    accessor: "action",
    classes: "hidden lg:table-cell font-bold text-md text-text text-center",
  },
  {
    header: "Time",
    accessor: "time",
    classes: "hidden lg:table-cell font-bold text-md text-text text-center",
  },
  {
    header: "Due Date",
    accessor: "dueDate",
    classes: "font-bold text-md text-text text-center",
  },
  {
    header: "Tags",
    accessor: "tags",
    classes: "font-bold text-md text-text text-center",
  },
];


const DashboardUsers = () => {

  const router  = useRouter()

  const {allTasks} = useGetTasks()

  console.log("allTasks is here",allTasks)

  const renderRow = (item: TaskProps) => (
    <TableRow
    onClick={() =>router.push(`/admin/dashboard/${item.id}`)}
      key={item.id}
      className="border-b hover:cursor-pointer hover:bg-gray-100 border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight font-Inter"
    >
      <TableCell>
        <div className="w-3 h-3 rounded-full bg-red-500 "></div>
      </TableCell>
      <TableCell >
          <h3 className="font-semibold font-Inter">{item.title}</h3>
      </TableCell>
      <TableCell className="hidden md:table-cell  ">
       <div className=" flex justify-center">
         <Image
          src={assginBy}
          alt="img"
          width={50}
          height={50}
          className=" size-10 "
        />
       </div>
      </TableCell>
      <TableCell className="hidden md:table-cell ">
        <div className=" flex gap-2 items-center justify-center">
             <button className=" bg-transparent border border-[#513600FF] hover:bg-green-500 hover:text-white hover:cursor-pointer font-medium  text-[#513600FF] text-xs rounded p-1">
            Start
          </button>
             <button className=" bg-transparent border border-[#513600FF] hover:bg-red-500 hover:text-white hover:cursor-pointer font-medium  text-[#513600FF] text-xs rounded p-1">
            Finish
          </button>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <p className=" text-center text-lightRedText">
            2 hour
        </p>
      </TableCell>

      <TableCell>
        <p className=" text-center text-lightRedText">
            {item.dueDate}
        </p>
      </TableCell>
      <TableCell>
        <div className=" flex gap-2 items-center justify-center">
          {item.taskTags.map((tag, i) => {
            return (
              <span
                className=" odd:bg-[#f7e9ee] rounded odd:text-[#E8618CFF] p-1 even:text-[#636AE8FF] even:bg-[#F2F2FDFF]"
                key={i}
              >
                {tag.tag?.name}
              </span>
            );
          })}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="bg-[#fafafbe9] p-1 rounded-md mt-10">
      {allTasks.length <= 0 ? (
        <div className="text-center text-gray-500 h-64">No parents found.</div>
      ) : (
        <TableComponent
          columns={columns}
          data={allTasks}
          renderRow={renderRow}
        />
      )}
    </div>
  );
};

export default DashboardUsers;

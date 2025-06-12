import {
  dashboardUsersTableData,
  dashboardUsersTableDataProps,
} from "@/assets/Data";
import React from "react";
import TableComponent from "../../TableComponent";
import { TableCell, TableRow } from "../../ui/table";
import Image from "next/image";
import { Button } from "../../ui/button";

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
  const renderRow = (item: dashboardUsersTableDataProps) => (
    <TableRow
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <TableCell className="flex items-center gap-4  ">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell  ">
       <div className=" flex justify-center">
         <Image
          src={item.assignBy}
          alt="img"
          width={50}
          height={50}
          className=" size-10 "
        />
       </div>
      </TableCell>
      <TableCell className="hidden md:table-cell ">
        <div className=" flex gap-2 items-center justify-center">
            <Button className=" bg-transparent !border-lightRedText border hover:bg-lightRedText hover:text-white hover:cursor-pointer text-lightRedText">
                Start
            </Button>
             <Button className=" bg-transparent !border-lightRedText border hover:bg-lightRedText hover:text-white hover:cursor-pointer text-lightRedText">
                Finish
            </Button>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <p className=" text-center text-lightRedText">
            {item.time}
        </p>
      </TableCell>

      <TableCell>
        <p className=" text-center text-lightRedText">
            {item.dueDate}
        </p>
      </TableCell>
      <TableCell>
        <div className=" flex gap-2 items-center justify-center">
          {item.tags.map((tag, i) => {
            return (
              <span
                className=" odd:bg-[#f7e9ee] odd:text-[#E8618CFF] p-1 even:text-[#636AE8FF] even:bg-[#F2F2FDFF]"
                key={i}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="bg-[#fafafbe9] p-1 rounded-md mt-10">
      {dashboardUsersTableData.length <= 0 ? (
        <div className="text-center text-gray-500 h-64">No parents found.</div>
      ) : (
        <TableComponent
          columns={columns}
          data={dashboardUsersTableData}
          renderRow={renderRow}
        />
      )}
    </div>
  );
};

export default DashboardUsers;

"use client";

import React from "react";
import TableComponent from "../../TableComponent";
import { TableCell, TableRow } from "../../ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useGetTasks from "@/components/hooks/useGetTasks";
import { TaskProps } from "@/types/type";
import assginBy from "./../../../../public/images/assignlogo.png";
import { X, Check, Circle } from "lucide-react";
import useRemoveTask from "@/components/hooks/useRemoveTask";
import { format, parseISO } from "date-fns";
import { useAppContext } from "@/Context/AppContext";
import useUpdateStatus from "@/components/hooks/useUpdateStatus";

interface columnsProps {
  header: string;
  accessor: string;
  classes?: string;
}

const columns: columnsProps[] = [
  {
    header: "",
    accessor: "status",
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

const StatusIndicator = ({ status }: { status: string }) => {
  switch (status) {
    case "PENDING":
      return <div className="w-3 h-3 rounded-full bg-red-500" />;
    case "IN_PROGRESS":
      return <div className="w-3 h-3 rounded-full text-green-500" />;
    case "COMPLETED":
      return <Check className="w-4 h-4 text " />;
    default:
      return <Circle className="w-3 h-3 text-gray-400" />;
  }
};

const DashboardUsers = () => {
  const router = useRouter();
  const { allTasks } = useGetTasks();
  const { removeTask } = useRemoveTask();
  const{updateStatus} = useUpdateStatus()

  const{cookieData} = useAppContext()

  const role = cookieData?.role.toLowerCase()

  const formatDueDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy h:mm a");
    } catch {
      return "Invalid date";
    }
  };

  const handleTaskAction = (e: React.MouseEvent<HTMLButtonElement>, taskId: string, currentStatus: string) => {
    e.stopPropagation();

    switch(currentStatus){
      case "PENDING":
        updateStatus(e,taskId, "IN_PROGRESS")
        break;
      case "IN_PROGRESS":
        updateStatus(e,taskId, "COMPLETED")
        break;
      case "COMPLETED":
        updateStatus(e,taskId, "PENDING")
        break;
      default:
        break;
    }

    // Add your task status update logic here
    console.log(`Update task ${taskId} from ${currentStatus}`);
  };

  const renderRow = (item: TaskProps) => (
    <TableRow
      onClick={() => router.push(`/${role}/tasks/${item.id}`)}
      key={item.id}
      className="border-b hover:cursor-pointer hover:bg-gray-100 border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight font-Inter"
    >
      <TableCell>
        <StatusIndicator status={item.status} />
      </TableCell>
      <TableCell>
        <h3 className="font-semibold font-Inter">{item.title}</h3>
        <p className="text-xs text-gray-500 truncate max-w-[200px]">
          {item.description}
        </p>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex justify-center">
          <Image
            src={assginBy}
            alt="assignee"
            width={40}
            height={40}
            className="size-10 rounded-full"
          />
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex gap-2 items-center justify-center">
          {item.status === "PENDING" && (
            <button
              onClick={(e) => handleTaskAction(e, item.id, item.status)}
              className="bg-transparent border border-[#513600FF] hover:bg-green-500 hover:text-white hover:cursor-pointer font-medium text-[#513600FF] text-xs rounded p-1 px-2 transition-colors"
            >
              Start
            </button>
          )}
          {item.status === "IN_PROGRESS" && (
            <button
              onClick={(e) => handleTaskAction(e, item.id, item.status)}
              className="bg-transparent border border-[#513600FF] hover:bg-blue-500 hover:text-white hover:cursor-pointer font-medium text-[#513600FF] text-xs rounded p-1 px-2 transition-colors"
            >
              Complete
            </button>
          )}
        </div>
      </TableCell>
      <TableCell>
        <p className="text-center text-lightRedText">
          {formatDueDate(item.dueDate)}
        </p>
      </TableCell>
      <TableCell>
        <div className="flex gap-2 items-center justify-center flex-wrap">
          {item.taskTags.map((tag, i) => (
            <span
              className="odd:bg-[#f7e9ee] rounded odd:text-[#E8618CFF] p-1 px-2 even:text-[#636AE8FF] even:bg-[#F2F2FDFF] text-xs"
              key={tag.id || i}
            >
              {tag.tag?.name}
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeTask(item.id);
          }}
          className="hover:bg-gray-100 p-1 rounded-full hover:cursor-pointer"
          aria-label="Delete task"
        >
          <X size={16} />
        </button>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="bg-[#fafafbe9] p-1 rounded-md mt-10">
      {allTasks.length <= 0 ? (
        <div className="text-center text-gray-500 h-64 flex items-center justify-center">
          No tasks found.
        </div>
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
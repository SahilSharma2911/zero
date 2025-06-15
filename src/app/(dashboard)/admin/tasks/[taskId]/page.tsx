import CommentsWrapper from "@/components/Admin/task/CommentsWrapper";
import SingleTask from "@/components/Admin/task/SingleTask";
import axios from "axios";
import React from "react";

type paramsProps = {
  params: Promise<{ taskId: string }>;
};

const page = async ({ params }: paramsProps) => {
  const { taskId } = await params;


  return (
    <>
      <SingleTask taskId={taskId} />

  const fetchTaskById = async (Id: string) => {
    try {
      const response = await axios.get(
        `https://task-management-backend-kohl-omega.vercel.app/api/tasks/get-task/${Id}`
      );

      return response.data.data;
    } catch (error) {
      console.log("error occur in singleTask get", error);
    }
  };

  const data = fetchTaskById(taskId as string);


  return (
    <>
      <CommentsWrapper taskId={taskId} />
    </>
  );
};

export default page;

import SingleTask from "@/components/Admin/task/SingleTask";
import axios from "axios";
import React from "react";

type paramsProps = {
  params: Promise<{ taskId: string }>;
};

const page = async ({ params }: paramsProps) => {

  const { taskId } = await params

  return (
    <>
      <SingleTask taskId={taskId} />
    </>
  );
};

export default page;

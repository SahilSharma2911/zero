import React from "react";
import DashboardUsers from "@/components/Admin/dashboard/DashboardUsers";
import DashboardBar from "@/components/Admin/dashboard/DashboardBar";
import { useAppContext } from "@/Context/AppContext";
import axios from "axios";

type Props = {
  searchParams?: Promise<{ [key: string]: string }>;
};

const AdminDashboardPage = async ({ searchParams }: Props) => {
  const { adminId, userId } = (await searchParams) ?? {};
  let tasks = [];

  try {
    const queryParam = adminId ? `adminId=${adminId}` : `userId=${userId}`;
    const response = await axios.get(
      `https://task-management-backend-kohl-omega.vercel.app/api/tasks/get-tasks?${queryParam}`
    );

    console.log("response is here",response);

    tasks = response.data.data;
  } catch (error) {
    console.log("error occur in getting tasks", error);
  }

  return (
    <div className=" p-4">
      {/*----------------------- dashboard bar ----------------------------- */}
      <DashboardBar />

      {/*-------------------- user's information table ----------------------------- */}

      <DashboardUsers />
    </div>
  );
};

export default AdminDashboardPage;

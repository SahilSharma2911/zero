import React from "react";
import DashboardUsers from "@/components/Admin/dashboard/DashboardUsers";
import DashboardBar from "@/components/Admin/dashboard/DashboardBar";

const AdminDashboardPage = async () => {
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

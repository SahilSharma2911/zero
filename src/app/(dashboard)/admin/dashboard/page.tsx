import React from "react";
import DashboardUsers from "@/components/Admin/DashboardUsers";
import DashboardBar from "@/components/Admin/DashboardBar";

const AdminDashboardPage = () => {
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

import TagBar from "@/components/Admin/tags/TagBar";
import TagsTable from "@/components/Admin/tags/TagsTable";
import React from "react";

const page = () => {
  return (
    <div className=" p-4">
      {/*----------------------- User bar ----------------------------- */}
      <TagBar />

      {/*-------------------- user's information table ----------------------------- */}
      <TagsTable />
    </div>
  );
};

export default page;

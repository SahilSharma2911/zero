"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

const AdminPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsLoading(true);

    startTransition(() => {
      router.push("/admin/dashboard");
    });

    setIsLoading(false);
  }, [router]);

  return <div className=" flex justify-center items-center h-screen">
    {isLoading && <div className=" text-4xl text-black">Loading...</div>}
  </div>;
};

export default AdminPage;

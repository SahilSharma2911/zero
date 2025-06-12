import UserBar from '@/components/Admin/users/UserBar'
import UsersTable from '@/components/Admin/users/UsersTable'
import React from 'react'

const page = () => {
  return (
    <div className=" p-4">
      {/*----------------------- User bar ----------------------------- */}
      <UserBar />

      {/*-------------------- user's information table ----------------------------- */}

      <UsersTable />
    </div>
  )
}

export default page

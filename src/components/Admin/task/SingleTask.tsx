import { TaskProps } from '@/types/type'
import React from 'react'
import assignTo from '../../../../public/images/assignlogo.png'
import Image from 'next/image'

interface User {
  id: string;
  name: string;
  email: string;
}

interface Attachment {
  id: string;
  fileUrl: string;
  uploadedAt: string;
}

interface Comment {
  // Define based on your comment structure
  id?: string;
  content?: string;
  author?: User;
  createdAt?: string;
}

interface Subtask {
  // Define based on your subtask structure
  id?: string;
  title?: string;
  completed?: boolean;
}

interface Tag {
  id: string;
  name: string;
  color: string; // Hex color code
}

enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO 8601 format
  status: TaskStatus;
  adminId: string | null;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdByAdmin: User | null;
  createdByUser: User | null;
  attachments: Attachment[];
  subtasks: Subtask[];
  comments: Comment[];
  tags: Tag[];
}


const SingleTask = (data:Task) => {
  return (
    <div className=' flex p-4 w-full h-screen'>

        {/* left side section  */}
        <div className=' w-1/2'>

        {/*------ image and title -------- */}

        <div className=' flex gap-2 items-center'>
            <div>
                <Image src={assignTo} alt='assignTo' width={100} height={100} className=' w-10 h-10 rounded-full'/>
            </div>
            <h2>
                {data.title}
            </h2>
        </div>

        {/*------------- tags ----------- */}
        <div>
            {
                data.tags?.map((tag) =>(
                    <span key={tag.id} style={{backgroundColor:tag.color}}>
                        {tag.name}
                    </span>
                ))
            }
        </div>

        </div>
        {/* right side section of Comments  */}
      <div className=' w-1/2'>

      </div>
    </div>
  )
}

export default SingleTask

export interface User {
  id: string;
  name: string;
  email: string;
  role:string;
  password: string;
 
}



export interface Attachment {
  id: string;
  fileUrl: string;
  taskId: string;
  uploadedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskTag {
  id: string;
  taskId: string;
  tagId: string;
  tag: Tag;
}

export interface SubtaskProps {
  // Define subtask properties if needed
  // Currently empty in the example data
}

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'PENDING' | 'COMPLETED' | 'IN_PROGRESS'; // Adjust based on possible status values
  adminId: string | null;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  createdByAdmin: User | null;
  createdByUser: User | null;
  attachments: Attachment[];
  subtasks: Subtask[];
  taskTags: TaskTag[];
}


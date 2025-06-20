

import assignLogo from "../../public/images/assignlogo.png";
import { StaticImageData } from "next/image";



export interface dashboardUsersTableDataProps {
  id: number;
  name: string;
  assignBy: StaticImageData; // or JSX.Element if it's an image/component
  Action: string;
  time: string;
  dueDate: string;
  tags: string[];
}

export interface userTableDataProps {
  id: number;
  name: string;
  email: string;
  priority: string;
  teamMembers: string;
}

export interface tagsTableDataProps {
  id: number;
  name: string;
  color: string;

}



export const dashboardUsersTableData: dashboardUsersTableDataProps[] = [
  {
    id: 1,
    name: "John Doe",
    assignBy: assignLogo,
    Action: "view",
    time: "12:00 AM",
    dueDate: "12/12/2022",
    tags: ["#tag1", "#tag2", "#tag3"],
  },
  {
    id: 2,
    name: "Jimmy jeoe",
    assignBy: assignLogo,
    Action: "view",
    time: "12:00 AM",
    dueDate: "12/12/2022",
    tags: ["#tag1", "#tag2", "#tag3"],
  },
  {
    id: 3,
    name: "Jimmy Demo",
    assignBy: assignLogo,
    Action: "view",
    time: "12:00 AM",
    dueDate: "12/12/2022",
    tags: ["#tag1", "#tag2", "#tag3"],
  },
];

export const userTableData: userTableDataProps[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    priority: "1",
    teamMembers: "3",
  },
  {
    id: 2,
    name: "John Doe",
    email: "johndoe@gmail.com",
    priority: "1",
    teamMembers: "3",
  },
  {
    id: 3,
    name: "John Doe",
    email: "johndoe@gmail.com",
    priority: "1",
    teamMembers: "3",
  },
];

export const tagsTableData:tagsTableDataProps[] = [
  {
    id: 1,
    name: "#tag1",
    color: "bg-[#EA916EFF]",
  },
  {
    id: 2,
    name: "#tag2",
    color: "bg-[#22CCB2FF]",
  }
]

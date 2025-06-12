import { MdOutlineDashboard } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";

import { MdOutlineBookmarks } from "react-icons/md";
import { MdOutlineInsertChart } from "react-icons/md";
import { JSX } from "react";
import assignLogo from '../../public/images/assignlogo.png'
import { StaticImageData } from "next/image";

interface MenuItem {
    icon: JSX.Element;
    label: string;
    path: string;
}

export interface dashboardUsersTableDataProps{
    id: number;
  name: string;
  assignBy: StaticImageData; // or JSX.Element if it's an image/component
  Action: string;
  time: string;
  dueDate: string;
  tags: string[];

}


export const menuItems:MenuItem[] = [
    {
        icon: <MdOutlineDashboard/>,
        label: "Dashboard",
        path: "/admin/dashboard",
    },
    {
        icon:<MdOutlineInsertChart/>,
        label:'Tasks',
        path:"/admin/tasks"
    },
    {
        icon:<LuUserRound/>,
        label:'Users',
        path:"/users"
    },
    {
        icon:<MdOutlineBookmarks/>,
        label:'Tags',
        path:"/tags"
    }
]


export const dashboardUsersTableData:dashboardUsersTableDataProps[] = [
    {
        id:1,
        name:"John Doe",
        assignBy:assignLogo,
        Action:"view",
        time:"12:00 AM",
        dueDate:"12/12/2022",
        tags:["#tag1","#tag2","#tag3"]
    },
    {
        id:2,
        name:"Jimmy jeoe",
        assignBy:assignLogo,
        Action:"view",
        time:"12:00 AM",
        dueDate:"12/12/2022",
        tags:["#tag1","#tag2","#tag3"]
    },
    {
        id:3,
        name:"Jimmy Demo",
        assignBy:assignLogo,
        Action:"view",
        time:"12:00 AM",
        dueDate:"12/12/2022",
        tags:["#tag1","#tag2","#tag3"]
    }
]
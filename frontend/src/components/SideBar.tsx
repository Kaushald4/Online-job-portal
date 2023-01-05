import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import {
    IoHomeOutline,
    IoSparklesOutline,
    IoNotificationsOutline,
    IoBriefcaseOutline,
    IoExitOutline,
} from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";

import SideBarItem from "./SideBarItem";
import Button from "./Button";

const SideBar = () => {
    return (
        <aside
            className="w-64 flex flex-col justify-between h-[92vh] overflow-y-auto backdrop-blur-lg dark:bg-[rgba(255,255,255,.04)]"
            aria-label="Sidebar"
        >
            <div className="px-3 py-4 overflow-y-auto">
                <ul className="space-y-2">
                    <SideBarItem
                        to={"/"}
                        title="Home"
                        icon={<IoHomeOutline className="h-full w-full" />}
                    />
                    <SideBarItem
                        to={"/profile"}
                        title="Profile"
                        icon={<IoSparklesOutline className="h-full w-full" />}
                    />
                    <SideBarItem
                        to={"/notification"}
                        title="Notification"
                        badgeCount={9}
                        icon={<IoNotificationsOutline className="w-full h-full" />}
                    />
                    <SideBarItem
                        to={"/job"}
                        title="Jobs"
                        icon={<IoBriefcaseOutline className="h-full w-full" />}
                    />
                    <SideBarItem
                        to={"/my-connections"}
                        title="My Connections"
                        icon={<HiOutlineUserGroup className="h-full w-full" />}
                    />
                    <div className="py-4" />
                    <Button outline={true}>Post a Job</Button>
                </ul>
            </div>
            <div className="text-center mx-5 pb-5">
                <Button icon={<IoExitOutline className="w-[20px] h-[20px]" />}>Signout</Button>
            </div>
        </aside>
    );
};

export default SideBar;

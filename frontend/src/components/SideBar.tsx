import {
    IoSparklesOutline,
    IoNotificationsOutline,
    IoBriefcaseOutline,
    IoExitOutline,
} from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";

import { useState } from "react";
import SideBarItem from "./SideBarItem";
import Button from "./Button";
import JoinTalentModal from "./Modals/JoinTalentModal";
import { useGetUserQuery } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import useCreateJob from "../hooks/useCreateJob";

const SideBar = () => {
    const [showJoinModal, setShowJoinModal] = useState(false);
    const { handleJoin } = useCreateJob();
    const { data } = useGetUserQuery();
    const navigate = useNavigate();

    const handlePostJob = () => {
        if (data?.data) {
            const { role } = data?.data;
            if (role === "EMPLOYEE") {
                setShowJoinModal(true);
            } else {
                navigate("/job/create");
            }
        }
    };

    return (
        <>
            <JoinTalentModal
                handleJoinNow={handleJoin}
                showModal={showJoinModal}
                setShowModal={setShowJoinModal}
            />
            <aside
                className="w-64 flex flex-col justify-between h-[92vh] overflow-y-auto backdrop-blur-lg dark:bg-[rgba(255,255,255,.04)]"
                aria-label="Sidebar"
            >
                <div className="px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2">
                        <SideBarItem
                            to={"/"}
                            title="Jobs"
                            icon={<IoBriefcaseOutline className="h-full w-full" />}
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
                            to={"/message"}
                            title="Message"
                            icon={<IoBriefcaseOutline className="h-full w-full" />}
                        />
                        <SideBarItem
                            to={"/my-connections"}
                            title="My Connections"
                            icon={<HiOutlineUserGroup className="h-full w-full" />}
                        />
                        {data?.data.role === "EMPLOYER" && (
                            <SideBarItem
                                to={"/orginazation"}
                                title="Your Orginazation"
                                icon={<HiOutlineUserGroup className="h-full w-full" />}
                            />
                        )}
                        <div className="py-4" />
                        <Button outline={true} onClick={handlePostJob}>
                            Post a Job
                        </Button>
                    </ul>
                </div>
                <div className="text-center mx-5 pb-5">
                    <Button icon={<IoExitOutline className="w-[20px] h-[20px]" />}>Signout</Button>
                </div>
            </aside>
        </>
    );
};

export default SideBar;

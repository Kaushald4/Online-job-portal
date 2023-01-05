import React from "react";
import Navbar from "./Navbar";
import RightSideBar from "./RightSideBar";
import SideBar from "./SideBar";

const Layout = ({ children }: any) => {
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div>
                    <SideBar />
                </div>
                <div className="flex-[.8] px-6 pt-2">{children}</div>
                <div className="flex-[.4]">
                    <RightSideBar />
                </div>
            </div>
        </div>
    );
};

export default Layout;

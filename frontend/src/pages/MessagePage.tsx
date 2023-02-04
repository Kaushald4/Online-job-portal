import React from "react";
import GradientLayout from "../components/GradientLayout";
import Layout from "../components/Layout";

const MessagePage = () => {
    return (
        <GradientLayout>
            <Layout>
                <div className="dark:text-white h-[50vh] text-black flex justify-center items-center flex-col">
                    <h1 className="text-4xl">Message Page</h1>
                    <p>Under Construction</p>
                </div>
            </Layout>
        </GradientLayout>
    );
};

export default MessagePage;

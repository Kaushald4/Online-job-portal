import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "../components/Button";
import GradientLayout from "../components/GradientLayout";
import Layout from "../components/Layout";
import CreateOrginazationModal from "../components/Modals/CreateOrginazationModal";
import useOrginazation from "../hooks/useOrginazation";

const OrginazationPage = () => {
    const {
        handleShowOrz,
        showCreateModal,
        handleOrginazationDetails,
        orginazationDetails,
        handleOrginazationFile,
        createOrginazation,
        handleOrginazationLocation,
        orgzStatus,
    } = useOrginazation();

    return (
        <GradientLayout>
            <Layout>
                <div className="flex items-center justify-between">
                    <h1 className="dark:text-white text-black text-[25px]">Your Orginazations</h1>
                    <div>
                        <Button
                            onClick={() => handleShowOrz("show")}
                            outline
                            icon={<AiOutlinePlus className="w-full h-full" />}
                        >
                            Create New
                        </Button>
                    </div>
                </div>
                <CreateOrginazationModal
                    showModal={showCreateModal}
                    handleShowModal={handleShowOrz}
                    handleOrginazationDetails={handleOrginazationDetails}
                    orginazationDetails={orginazationDetails}
                    handleOrginazationFile={handleOrginazationFile}
                    createOrginazation={createOrginazation}
                    handleOrginazationLocation={handleOrginazationLocation}
                    orgzStatus={orgzStatus}
                />
            </Layout>
        </GradientLayout>
    );
};

export default OrginazationPage;

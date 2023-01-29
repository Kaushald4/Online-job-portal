import { AiOutlinePlus } from "react-icons/ai";

import Button from "../../components/Button";
import { OrginazationCard } from "../../components/Cards/OrginazationCard";
import GradientLayout from "../../components/GradientLayout";
import Layout from "../../components/Layout";
import LoadingIndicator from "../../components/LoadingIndicator";
import CreateOrginazationModal from "../../components/Modals/CreateOrginazationModal";
import useOrginazation from "../../hooks/useOrginazation";

const OrginazationListPage = () => {
    const {
        handleShowOrz,
        showCreateModal,
        handleOrginazationDetails,
        orginazationDetails,
        handleOrginazationFile,
        createOrginazation,
        handleOrginazationLocation,
        orgzStatus,
        isMyOrginazationLoading,
        myOrganization,
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

                {/* //orginazations list */}
                <div className="flex items-center flex-wrap gap-4 justify-center mt-5">
                    {isMyOrginazationLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <>
                            {myOrganization?.success ? (
                                myOrganization?.data.map((orginazation) => {
                                    return (
                                        <OrginazationCard
                                            key={orginazation._id}
                                            data={orginazation}
                                            success={myOrganization!!.success}
                                        />
                                    );
                                })
                            ) : (
                                <p>{myOrganization?.message}</p>
                            )}
                        </>
                    )}
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

export default OrginazationListPage;

import React, { ChangeEvent } from "react";
import TextInput from "../TextInput";
import { OrginazationProps } from "../../hooks/useOrginazation";
import LocationPicker from "../LocationPicker";
import Button from "../Button";

interface Props {
    showModal: boolean;
    handleShowModal: (action: "show" | "close") => void;
    orginazationDetails: OrginazationProps;
    handleOrginazationDetails: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleOrginazationFile: (e: ChangeEvent<HTMLInputElement>) => void;
    createOrginazation: () => void;
    handleOrginazationLocation: (
        location: string,
        locationType: "country" | "state" | "city"
    ) => void;
    orgzStatus: any;
}

const CreateOrginazationModal = ({
    handleShowModal,
    showModal,
    handleOrginazationDetails,
    orginazationDetails,
    handleOrginazationFile,
    createOrginazation,
    handleOrginazationLocation,
    orgzStatus,
}: Props) => {
    return (
        <>
            {/* Main modal */}
            {showModal && (
                <div
                    id="defaultModal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-[rgba(0,0,0,.6)]"
                >
                    <div className="relative w-full h-full max-w-2xl md:h-auto mx-auto">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
                            {/* Modal header */}
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    New Orginazation
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="defaultModal"
                                    disabled={orgzStatus.isLoading}
                                    onClick={() => handleShowModal("close")}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-6 space-y-6">
                                <TextInput
                                    label="Orginazation Name"
                                    placeholder="Orginazation Name"
                                    name="orginazationName"
                                    value={orginazationDetails.orginazationName}
                                    onChange={handleOrginazationDetails}
                                    disabled={orgzStatus.isLoading}
                                />

                                <div>
                                    {orginazationDetails.photoPreview && (
                                        <div>
                                            <img
                                                className="w-[120px]"
                                                src={orginazationDetails.photoPreview}
                                                alt="cover phto"
                                            />
                                        </div>
                                    )}
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        htmlFor="file_input"
                                    >
                                        Orginazation Photo
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                        name="orginazationPhoto"
                                        onChange={handleOrginazationFile}
                                        disabled={orgzStatus.isLoading}
                                    />
                                </div>
                                <div>
                                    {orginazationDetails.coverPreview && (
                                        <div>
                                            <img
                                                className="w-[120px]"
                                                src={orginazationDetails.coverPreview}
                                                alt="cover phto"
                                            />
                                        </div>
                                    )}
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        htmlFor="file_input"
                                    >
                                        Orginazation Cover Photo
                                    </label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                        name="orginazationCover"
                                        onChange={handleOrginazationFile}
                                        disabled={orgzStatus.isLoading}
                                    />
                                </div>
                                <TextInput
                                    label="Headline (Optional)"
                                    placeholder="headline"
                                    name="orginazationHeadline"
                                    value={orginazationDetails.orginazationHeadline}
                                    onChange={handleOrginazationDetails}
                                    disabled={orgzStatus.isLoading}
                                />

                                <TextInput
                                    label="Orgination Type"
                                    placeholder="software development"
                                    name="orginazationType"
                                    value={orginazationDetails.orginazationType}
                                    onChange={handleOrginazationDetails}
                                    disabled={orgzStatus.isLoading}
                                />

                                <TextInput
                                    label="Orgination Website"
                                    placeholder="https://example.com"
                                    name="orginazationWebsite"
                                    value={orginazationDetails.orginazationWebsite}
                                    onChange={handleOrginazationDetails}
                                    disabled={orgzStatus.isLoading}
                                />
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        About Orginazation
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write about your orginazation here..."
                                        name="aboutOrginazation"
                                        value={orginazationDetails.aboutOrginazation}
                                        onChange={handleOrginazationDetails}
                                        disabled={orgzStatus.isLoading}
                                    ></textarea>
                                </div>

                                <div>
                                    <LocationPicker
                                        handleOrginazationLocation={handleOrginazationLocation}
                                        disabled={orgzStatus.isLoading}
                                    />
                                </div>
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <div>
                                    <Button
                                        onClick={createOrginazation}
                                        disabled={orgzStatus.isLoading}
                                        isLoading={orgzStatus.isLoading}
                                    >
                                        I accept
                                    </Button>
                                </div>
                                <button
                                    data-modal-hide="defaultModal"
                                    type="button"
                                    disabled={orgzStatus.isLoading}
                                    onClick={() => handleShowModal("close")}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateOrginazationModal;

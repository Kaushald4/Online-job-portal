import React, { ChangeEvent, useState } from "react";
import useModal from "../../hooks/useModal";
import { IUser } from "../../hooks/useProfile";
import Button from "../Button";
import TextInput from "../TextInput";

interface Props {
  isShown: boolean;
  close: () => void;
  user: IUser;
  handleProfileChnage: (e: ChangeEvent<HTMLInputElement>) => void;
  updateProfile: Function;
  handleProfileFile: (e: ChangeEvent<HTMLInputElement>) => void;
  userDataStatus: any;
}

const EditProfileModal = ({
  close,
  isShown,
  user,
  handleProfileChnage,
  updateProfile,
  handleProfileFile,
  userDataStatus,
}: Props) => {
  const { renderChangePassModal, showModal } = useModal();

  return isShown ? (
    <>
      {/* Modal toggle */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-[rgba(0,0,0,.7)]">
        <div className="relative w-full h-full max-w-2xl md:h-auto mx-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Profile
              </h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                placeholder={user.firstName}
                label="First Name"
                name="firstName"
                value={user.firstName}
                onChange={handleProfileChnage}
                labelFor="FirstName"
                disabled={userDataStatus.isLoading}
              />
              <TextInput
                placeholder={user.lastName}
                label="Last Name"
                name="lastName"
                labelFor="LastName"
                value={user.lastName}
                onChange={handleProfileChnage}
                disabled={userDataStatus.isLoading}
              />
              <TextInput
                placeholder={user.email}
                label="Email"
                name="email"
                labelFor="Email"
                value={user.email}
                onChange={handleProfileChnage}
                disabled={userDataStatus.isLoading}
              />
              <TextInput
                placeholder={user.phoneNumber}
                label="Phone Number"
                labelFor="PhoneNumber"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleProfileChnage}
                disabled={userDataStatus.isLoading}
              />
              <div className="w-[200px]">
                <Button
                  disabled={userDataStatus.isLoading}
                  onClick={() => showModal("EditPassword")}
                  outline
                >
                  Change Password
                </Button>
              </div>
              {/* Edit Password Modal */}
              {renderChangePassModal(handleProfileChnage)}

              {user.profilePhoto?.preview ? (
                <img
                  className="w-[200px]"
                  src={user.profilePhoto?.preview}
                  alt="photo"
                />
              ) : (
                <>
                  {user.profilePhoto?.secureUrl && (
                    <img
                      className="w-[200px]"
                      src={user.profilePhoto?.secureUrl}
                      alt="photo"
                    />
                  )}
                </>
              )}
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Profile Photo
              </label>
              <input
                disabled={userDataStatus.isLoading}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                name="profilePhoto"
                onChange={handleProfileFile}
                type="file"
              />

              {user.coverPhoto?.preview ? (
                <img
                  className="w-[200px]"
                  src={user.coverPhoto?.preview}
                  alt="photo"
                />
              ) : (
                <>
                  {user.coverPhoto?.secureUrl && (
                    <img
                      className="w-[200px]"
                      src={user.coverPhoto?.secureUrl}
                      alt="photo"
                    />
                  )}
                </>
              )}
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Cover Photo
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                disabled={userDataStatus.isLoading}
                name="coverPhoto"
                onChange={handleProfileFile}
              />
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <Button
                disabled={userDataStatus.isLoading}
                isLoading={userDataStatus.isLoading}
                onClick={() => updateProfile(close)}
              >
                Save
              </Button>
              <Button
                disabled={userDataStatus.isLoading}
                onClick={close}
                outline
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default EditProfileModal;

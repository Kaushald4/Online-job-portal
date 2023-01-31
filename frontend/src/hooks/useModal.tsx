import React, { ChangeEvent, useState } from "react";
import ChangePasswordModal from "../components/Modals/ChangePasswordModal";
import EditProfileModal from "../components/Modals/EditProfileModal";
import { IUser } from "./useProfile";

const useModal = () => {
  const [showPassModal, setShowPassModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const renderChangePassModal = (
    handleProfileChnage: (e: ChangeEvent<HTMLInputElement>) => void
  ) => (
    <ChangePasswordModal
      isShown={showPassModal}
      handleProfileChnage={handleProfileChnage}
      close={() => setShowPassModal(false)}
    />
  );

  const renderEditProfileModal = (
    user: IUser,
    handleProfileChnage: (e: ChangeEvent<HTMLInputElement>) => void,
    updateProfile: Function,
    handleProfileFile: (e: ChangeEvent<HTMLInputElement>) => void,
    userDataStatus: any
  ) => (
    <EditProfileModal
      user={user}
      isShown={showProfileModal}
      close={() => setShowProfileModal(false)}
      handleProfileChnage={handleProfileChnage}
      updateProfile={updateProfile}
      handleProfileFile={handleProfileFile}
      userDataStatus={userDataStatus}
    />
  );

  const showModal = (modalName: "EditPassword" | "EditProfile") => {
    switch (modalName) {
      case "EditPassword":
        setShowPassModal(true);
        break;
      case "EditProfile":
        setShowProfileModal(true);
        break;
    }
  };

  return { renderChangePassModal, renderEditProfileModal, showModal };
};

export default useModal;

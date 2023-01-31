import CoverPhoto from "../components/CoverPhoto";
import GradientLayout from "../components/GradientLayout";
import Layout from "../components/Layout";
import useModal from "../hooks/useModal";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const {
    user,
    handleProfileChnage,
    updateProfile,
    handleProfileFile,
    userDataStatus,
    error,
    isLoading,
  } = useProfile();
  const { showModal, renderEditProfileModal } = useModal();

  return (
    <GradientLayout>
      <Layout>
        <CoverPhoto
          name={`${user?.firstName} ${user?.lastName}`}
          headline={user?.email}
          photoUrl={user?.profilePhoto?.secureUrl}
          coverUrl={user?.coverPhoto?.secureUrl}
          profile
          onEditClick={() => showModal("EditProfile")}
        />

        {renderEditProfileModal(
          user,
          handleProfileChnage,
          updateProfile,
          handleProfileFile,
          userDataStatus
        )}
      </Layout>
    </GradientLayout>
  );
};

export default ProfilePage;

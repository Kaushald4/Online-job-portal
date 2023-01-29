import React from "react";
import CoverPhoto from "../components/CoverPhoto";
import GradientLayout from "../components/GradientLayout";
import Layout from "../components/Layout";
import { useGetUserQuery } from "../features/auth/authSlice";

const ProfilePage = () => {
  const { data } = useGetUserQuery();

  return (
    <GradientLayout>
      <Layout>
        <CoverPhoto
          name={`${data?.data.firstName} ${data?.data.lastName}`}
          headline={data?.data.email}
          photoUrl={data?.data?.profilePhoto?.secureUrl}
          coverUrl={data?.data?.coverPhoto?.secureUrl}
          profile
        />
      </Layout>
    </GradientLayout>
  );
};

export default ProfilePage;

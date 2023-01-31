import { ChangeEvent, useEffect, useState } from "react";
import { useGetUserQuery } from "../features/auth/authSlice";
import {
  useUpdateUserPasswordMutation,
  useUpdateUserProfileMutation,
} from "../features/user/userSlice";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  retypePassword?: string;
  currentPassword?: string;
  profilePhoto: {
    preview?: string;
    File?: any;
    secureUrl: string;
    photoID: string;
  };
  coverPhoto: {
    preview?: string;
    File?: any;
    secureUrl: string;
    photoID: string;
  };
}

const useProfile = () => {
  const { data, isLoading, error, refetch } = useGetUserQuery();
  const [updateUserData, userDataStatus] = useUpdateUserProfileMutation();
  const [updateUserPassword, userPasswordDataStatus] =
    useUpdateUserPasswordMutation();
  const [user, setUser] = useState<IUser>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    currentPassword: "",
    password: "",
    retypePassword: "",
    profilePhoto: {
      secureUrl: "",
      photoID: "",
      File: null,
      preview: "",
    },
    coverPhoto: {
      secureUrl: "",
      photoID: "",
      File: null,
      preview: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      setUser({
        ...data.data,
        profilePhoto: {
          secureUrl: data.data?.profilePhoto?.secureUrl,
          photoID: data.data?.profilePhoto?.photoID,
          File: null,
          preview: "",
        },
        coverPhoto: {
          secureUrl: data.data?.coverPhoto?.secureUrl,
          photoID: data.data?.coverPhoto?.photoID,
          File: null,
          preview: "",
        },
      });
    }
  }, [data]);

  const handleProfileChnage = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleProfileFile = (e: ChangeEvent<HTMLInputElement>) => {
    const previewUrl = URL.createObjectURL(e.target.files!![0]);

    switch (e.target.name) {
      case "profilePhoto":
        setUser((prevState) => {
          return {
            ...prevState,
            profilePhoto: {
              ...prevState.profilePhoto,
              File: e.target.files!![0],
              preview: previewUrl,
            },
          };
        });
        break;

      case "coverPhoto":
        setUser((prevState) => {
          return {
            ...prevState,
            coverPhoto: {
              ...prevState.coverPhoto,
              File: e.target.files!![0],
              preview: previewUrl,
            },
          };
        });
        break;
    }
    setUser((prevState) => {
      return {
        ...prevState,
      };
    });
  };

  // function responsible for making api call using action slice
  const updateProfile = (closeProfileEditModal: Function) => {
    const formData = new FormData();

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("photo", user.profilePhoto.File);
    formData.append("cover", user.coverPhoto.File);

    updateUserData(formData).then((res) => {
      refetch();
      closeProfileEditModal();
    });
  };

  return {
    user,
    updateProfile,
    isLoading,
    error,
    handleProfileChnage,
    handleProfileFile,
    userDataStatus,
  };
};

export default useProfile;

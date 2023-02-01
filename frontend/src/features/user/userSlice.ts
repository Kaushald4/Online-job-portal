import { emptySplitApi } from "../baseApiSlice";

export interface IUser {
    success: boolean;
    message?: string;
    data: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        token: string;
        phoneNumber: string;
        role?: string;
        profilePhoto: {
            secureUrl: string;
            photoID: string;
        };
        coverPhoto: {
            secureUrl: string;
            photoID: string;
        };
    };
}

interface IUserPassword {
    password: string;
}

const userApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        updateUserProfile: build.mutation<IUser, FormData>({
            query: (userDetils) => ({
                url: `/user/update`,
                method: "PUT",
                body: userDetils,
                credentials: "include",
            }),
        }),
        updateUserPassword: build.mutation<IUserPassword, FormData>({
            query: (userDetils) => ({
                url: `/user/update`,
                method: "PATCH",
                body: userDetils,
                credentials: "include",
            }),
        }),
    }),
    overrideExisting: true,
});

export const { useUpdateUserProfileMutation, useUpdateUserPasswordMutation } =
    userApi;
export default userApi;

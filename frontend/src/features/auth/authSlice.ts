import { emptySplitApi } from "../baseApiSlice";

export interface IUser {
    success: boolean;
    message?: string;
    data: {
        firstName: string;
        lastName: string;
        email: string;
        token: string;
        role?: string;
        profilePhoto: {
            secureUrl: string;
            photoID: string;
        };
        coverPhoto: {
            secureUrl: string;
            photoID: string;
        }
    };
}

interface ISignupParams {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}
interface ILoginParams {
    email: string;
    password: string;
}

const authApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        signup: build.mutation<IUser, ISignupParams>({
            query: (authDetails) => ({
                url: `/auth/signup`,
                method: "POST",
                body: authDetails,
                credentials: "include",
            }),
        }),
        login: build.mutation<IUser, ILoginParams>({
            query: (authDetails) => ({
                url: `/auth/login`,
                method: "POST",
                body: authDetails,
                credentials: "include",
            }),
        }),
        getUser: build.query<IUser, void>({
            query: () => ({ url: `/auth/profile`, method: "GET", credentials: "include" }),
        }),
        updateUserRole: build.mutation<IUser, void>({
            query: () => ({ url: "/auth/profile/role", credentials: "include" }),
        }),
    }),
    overrideExisting: true,
});

export const { useSignupMutation, useLoginMutation, useGetUserQuery, useUpdateUserRoleMutation } =
    authApi;
export default authApi;

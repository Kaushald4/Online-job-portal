import { emptySplitApi } from "../baseApiSlice";

interface IUser {
    success: boolean;
    data: {
        firstName: string;
        lastName: string;
        email: string;
        token: string;
        message?: string;
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
    }),
    overrideExisting: true,
});

export const { useSignupMutation, useLoginMutation, useGetUserQuery } = authApi;
export default authApi;

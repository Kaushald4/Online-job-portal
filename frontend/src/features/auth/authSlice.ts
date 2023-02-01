import { emptySplitApi } from "../baseApiSlice";

export interface IUser {
    success: boolean;
    message?: string;
    data: {
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
            invalidatesTags: ["Auth"],
        }),
        login: build.mutation<IUser, ILoginParams>({
            query: (authDetails) => ({
                url: `/auth/login`,
                method: "POST",
                body: authDetails,
                credentials: "include",
            }),
            invalidatesTags: ["Auth"],
        }),
        logout: build.mutation<string, void>({
            query: () => ({
                url: `/auth/logout`,
                method: "GET",
                credentials: "include",
            }),
        }),
        getUser: build.query<IUser, void>({
            query: () => ({
                url: `/auth/profile`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Auth"],
        }),
        updateUserRole: build.mutation<IUser, void>({
            query: () => ({
                url: "/auth/profile/role",
                credentials: "include",
            }),
            invalidatesTags: ["Auth"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useSignupMutation,
    useLoginMutation,
    useGetUserQuery,
    useUpdateUserRoleMutation,
    useLogoutMutation,
} = authApi;
export default authApi;

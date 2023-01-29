import { emptySplitApi } from "../baseApiSlice";

export interface IOrginazation {
    success: boolean;
    message?: string;
    data: {
        _id: string;
        name: string;
        orginazationType: string;
        headline: string;
        location: {
            country: string;
            state: string;
            city: string;
        };
        website: string;
        about: string;
        coverPhoto: {
            secureUrl: string;
            photoId: string;
        };
        photo: {
            secureUrl: string;
            photoId: string;
        };
        author?: any;
    };
}

export interface IOrginazations {
    success: boolean;
    message?: string;
    data: [
        {
            _id: string;
            name: string;
            orginazationType: string;
            headline: string;
            location: {
                country: string;
                state: string;
                city: string;
            };
            website: string;
            about: string;
            coverPhoto: {
                secureUrl: string;
                photoId: string;
            };
            photo: {
                secureUrl: string;
                photoId: string;
            };
            author?: any;
        }
    ];
}

interface IOrginazationQueryParam {
    orginazationID: string;
}

const orginazationApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        createOrginazation: build.mutation<IOrginazation, FormData>({
            query: (orginazationDetails) => ({
                url: `/orginazation`,
                method: "POST",
                body: orginazationDetails,
                credentials: "include",
            }),
        }),
        getMyOrginazations: build.query<IOrginazations, void>({
            query: () => ({
                url: "/orginazation",
                method: "GET",
                credentials: "include",
            }),
        }),
        getOrginazation: build.query<IOrginazation, IOrginazationQueryParam>({
            query: ({ orginazationID }) => ({
                url: `/orginazation/${orginazationID}`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateOrginazationMutation,
    useGetMyOrginazationsQuery,
    useGetOrginazationQuery,
} = orginazationApi;
export default orginazationApi;

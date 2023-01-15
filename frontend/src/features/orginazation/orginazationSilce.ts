import { emptySplitApi } from "../baseApiSlice";

interface IOrginazation {
    success: boolean;
    data: {
        name: string;
        orginazationType: string;
        heading: string;
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

interface IOrginazationParams {
    name: string;
    orginazationType: string;
    heading: string;
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
    }),
    overrideExisting: true,
});

export const { useCreateOrginazationMutation } = orginazationApi;
export default orginazationApi;

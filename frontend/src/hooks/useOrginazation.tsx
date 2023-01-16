import { ChangeEvent, useState } from "react";
import {
    useCreateOrginazationMutation,
    useGetMyOrginazationQuery,
} from "../features/orginazation/orginazationSilce";

interface ILocation {
    country: string;
    state: string;
    city: string;
}

export interface OrginazationProps {
    orginazationName: string;
    orginazationHeadline: string;
    orginazationType: string;
    aboutOrginazation: string;
    orginazationWebsite: string;
    orginazationLocation: ILocation;
    orginazationPhoto: string | Blob;
    orginazationCover: string | Blob;
    coverPreview: string;
    photoPreview: string;
}

const useOrginazation = () => {
    const [showCreateOrginzationModal, setShowCreateOrginzationModal] = useState(false);
    const [orginazationDetails, setOrginazationDetails] = useState<OrginazationProps>({
        aboutOrginazation: "",
        orginazationPhoto: "",
        orginazationCover: "",
        coverPreview: "",
        photoPreview: "",
        orginazationWebsite: "",
        orginazationHeadline: "",
        orginazationType: "",
        orginazationName: "",
        orginazationLocation: {
            city: "",
            country: "",
            state: "",
        },
    });

    // orginazation feature slice
    const [createOrgz, orgzStatus] = useCreateOrginazationMutation();
    const {
        isLoading: isMyOrginazationLoading,
        data: myOrganization,
        refetch,
    } = useGetMyOrginazationQuery();

    // helper function for hiding & displaying modal
    const handleShowOrz = (action: "show" | "close") => {
        setShowCreateOrginzationModal(action === "show" ? true : false);
    };
    // handler for file input
    const handleOrginazationFile = (e: ChangeEvent<HTMLInputElement>) => {
        const previewUrl = URL.createObjectURL(e.target.files!![0]);
        if (e.target.name === "orginazationPhoto") {
            setOrginazationDetails({
                ...orginazationDetails,
                [e.target.name]: e.target.files!![0],
                photoPreview: previewUrl,
            });
        } else if (e.target.name === "orginazationCover") {
            setOrginazationDetails({
                ...orginazationDetails,
                [e.target.name]: e.target.files!![0],
                coverPreview: previewUrl,
            });
        }
    };
    const handleOrginazationDetails = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOrginazationDetails({ ...orginazationDetails, [e.target.name]: e.target.value });
    };
    const handleOrginazationLocation = (
        location: string,
        locationType: "city" | "country" | "state"
    ) => {
        setOrginazationDetails({
            ...orginazationDetails,
            orginazationLocation: {
                ...orginazationDetails.orginazationLocation,
                [locationType]: location,
            },
        });
    };

    // helper function to create form data
    const createFormData = (): FormData => {
        const formData = new FormData();

        formData.append("cover", orginazationDetails.orginazationCover);
        formData.append("photo", orginazationDetails.orginazationPhoto);
        formData.append("name", orginazationDetails.orginazationName);
        formData.append("about", orginazationDetails.aboutOrginazation);
        formData.append("website", orginazationDetails.orginazationWebsite);
        formData.append("headline", orginazationDetails.orginazationHeadline);
        formData.append("orginazationType", orginazationDetails.orginazationType);
        formData.append("location", JSON.stringify(orginazationDetails.orginazationLocation));

        return formData;
    };

    const createOrginazation = () => {
        const data = createFormData();
        createOrgz(data).then((data) => {
            setShowCreateOrginzationModal(false);
            refetch();
        });
    };

    return {
        handleShowOrz,
        showCreateModal: showCreateOrginzationModal,
        orginazationDetails,
        handleOrginazationDetails,
        handleOrginazationFile,
        createOrginazation,
        handleOrginazationLocation,
        orgzStatus,
        isMyOrginazationLoading,
        myOrganization,
    };
};

export default useOrginazation;

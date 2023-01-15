import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserRoleMutation } from "../features/auth/authSlice";

const useCreateJob = () => {
    const [updateUserRole, result] = useUpdateUserRoleMutation();
    const navigate = useNavigate();

    const handleJoin = () => {
        updateUserRole()
            .unwrap()
            .then(() => {
                navigate("/job/create");
            });
    };

    return { handleJoin };
};

export default useCreateJob;

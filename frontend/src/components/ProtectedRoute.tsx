import React from "react";
import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "../features/auth/authSlice";

interface Props {
    children?: React.ReactNode;
}

const ProtectedRoute = (props: Props) => {
    const { children } = props;
    const { isLoading, error, data } = useGetUserQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <Navigate to="/auth/login" replace />;
    }

    if (!data?.data.email) {
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

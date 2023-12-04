import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { CircularProgress } from "@mui/material";


const Private = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <div className="flex justify-center mt-32">
            <div className="text-center mt-36">
                <CircularProgress color="secondary" />
            </div>
        </div>
    }
    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default Private;
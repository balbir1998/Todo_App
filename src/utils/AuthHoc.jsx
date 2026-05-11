import Loader from "../components/Loader/Loader";
import { useAuth } from "./AuthContext"
import { Navigate } from 'react-router-dom';

const AuthHoc = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loader />

    if (user) return children;

    return <Navigate to={'/'} />;
}

export default AuthHoc;
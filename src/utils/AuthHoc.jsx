import { useAuth } from "./AuthContext"
import { Navigate } from 'react-router-dom';

const AuthHoc = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <h1>Loading....</h1>;

    if (user) return children;

    return <Navigate to={'/'} />;
}

export default AuthHoc;
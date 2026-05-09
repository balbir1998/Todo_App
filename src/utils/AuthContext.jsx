import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem("user", JSON.stringify(currentUser));
            } else {
                setUser(null);
                localStorage.removeItem("user");
            }
            setLoading(false);
        });


        return () => unsubscibe();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
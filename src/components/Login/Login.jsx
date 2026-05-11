import { useTheme } from "../../utils/ThemeContext";
import InputField from "../InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import Loader from './../Loader/Loader';
import { BounceLoader } from 'react-spinners';

const Login = () => {
    const { darkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const naivgate = useNavigate();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            alert("Please fill email and password");
            return;
        }

        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);

            naivgate("/dashboard");
        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Loader />}
            <div className="px-4 py-5 flex justify-center items-center">
                <form
                    onSubmit={handleLogin}
                    className={`max-w-100 w-full my-25 p-5 shadow-[0_5px_15px_rgba(0,0,0,0.35)]
            rounded-[10px] ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
                >
                    <h2 className="mb-3 text-lg font-medium">Login</h2>

                    <InputField
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputField
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className={`w-full rounded-[10px] p-3.75 text-lg tracking-wider
                 font-medium cursor-pointer ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
                    >
                        Login
                    </button>

                    <Link to="/register" className="mt-2 inline-block hover:underline underline-offset-2">
                        Not Registered Yet? Register Now.
                    </Link>
                </form>
            </div>
        </>
    )
}

export default Login;
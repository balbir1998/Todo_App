import { useTheme } from "../../utils/ContextAPI";
import InputField from "../InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

const Login = () => {
    const { darkMode } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        navigate("/dashboard");
    }

    return (
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
    )
}

export default Login;
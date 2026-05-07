import InputField from './../InputField/InputField';
import { useTheme } from './../../utils/ContextAPI';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    const { darkMode } = useTheme();

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const registerUser = (e) => {
        e.preventDefault();
    }

    const handleInputField = (e) => {
        const { id, value } = e.target;

        setNewUser(prevState => ({ ...prevState, [id]: value }));
    }

    return (
        <div className="px-4 py-5 flex justify-center items-center">
            <form
                onSubmit={registerUser}
                className={`max-w-100 w-full my-25 p-5 shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                  rounded-[10px] ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
            >
                <h2 className="mb-3 text-lg font-medium">Register</h2>

                <InputField
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    value={newUser.name}
                    onChange={handleInputField}
                />

                <InputField
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputField}
                />

                <InputField
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleInputField}
                />

                <button className={`w-full rounded-[10px] p-3.75 text-lg tracking-wider
                       font-medium cursor-pointer ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
                >
                    Register
                </button>

                <Link to="/" className="mt-2 inline-block hover:underline underline-offset-2">
                    Already Registered? Login Now.
                </Link>
            </form>
        </div>
    )
}

export default Register;
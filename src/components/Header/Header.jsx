import { useTheme } from './../../utils/ThemeContext';
import DescriptionIcon from '@mui/icons-material/Description';
import SunnyIcon from '@mui/icons-material/Sunny';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { signOut } from "firebase/auth";
import { auth } from '../../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { darkMode, handleDarkMode } = useTheme();
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logout Successfully");

            navigate("/");
        } catch (err) {
            console.error(err)
            alert(err.message)
        }
    }

    return (
        <header className={`px-5 py-2.5 lg:px-40 lg:py-5 flex justify-between items-center
            ${darkMode ? "text-white" : "text-black"}`}
        >
            <Link
                to={`${user ? "/dashboard" : "/"}`}
                className='flex items-center gap-1.25 lg:gap-3 text-[22px] lg:text-[34px] font-medium'
            >
                <DescriptionIcon sx={{ fontSize: 34 }} />
                <span>TO-DO List</span>
            </Link>

            <div className='flex items-center gap-2 lg:gap-6'>
                <div className='text-lg *:text-[22px]! sm:*:text-[34px]! hover:transform
                hover:scale-[1.1] transition duration-300 cursor-pointer'
                    onClick={handleDarkMode}
                    title={`${darkMode ? "Light" : "Dark"} Mode`}
                >
                    {darkMode ? <SunnyIcon /> : <DarkModeOutlinedIcon />}
                </div>

                {
                    user && (
                        <div
                            className='hover:transform hover:scale-[1.1] transition duration-300 cursor-pointer'
                            title='Logout'
                            onClick={handleLogout}
                        >
                            <LogoutIcon className='text-[22px]! sm:text-[34px]!' />
                        </div>
                    )
                }
            </div>
        </header >
    )
}

export default Header;
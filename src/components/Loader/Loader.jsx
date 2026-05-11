import { useTheme } from './../../utils/ThemeContext';
import { BounceLoader } from 'react-spinners';

const Loader = () => {
    const { darkMode } = useTheme();

    return (
        <div className="fixed inset-0 z-999 flex justify-center items-center bg-gray-800/70">
            <BounceLoader color={darkMode ? "white" : "black"} />
        </div>
    )
}

export default Loader
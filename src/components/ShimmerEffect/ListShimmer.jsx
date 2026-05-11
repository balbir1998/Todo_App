import { useTheme } from './../../utils/ThemeContext';

const ListShimmer = () => {
    const { darkMode } = useTheme();

    return (
        <div className="mt-10 flex flex-col gap-5">
            <div className={`h-23  p-5 flex items-center rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                ${darkMode ? "bg-[rgb(40,40,40)]" : "bg-white"}`}>
                <div className="h-10 w-[60%] bg-gray-300 rounded-sm">
                </div>
            </div>
            <div className={`h-23  p-5 flex items-center rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                ${darkMode ? "bg-[rgb(40,40,40)]" : "bg-white"}`}>
                <div className="h-10 w-1/2 bg-gray-300 rounded-sm"></div>
            </div>
            <div className={`h-23 p-5 flex items-center rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.35)]
                ${darkMode ? "bg-[rgb(40,40,40)]" : "bg-white"}`}>
                <div className="h-10 w-[40%] bg-gray-300 rounded-sm"></div>
            </div>
        </div>
    )
}

export default ListShimmer;
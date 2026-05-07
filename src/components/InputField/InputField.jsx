import { useTheme } from './../../utils/ContextAPI';

const InputField = ({ type, id, placeholder, value, onChange }) => {
    const { darkMode } = useTheme();

    return (
        <div className={`mb-5 rounded-[10px] ${darkMode ? "bg-sky-100 outline-2 outline-black" : "bg-white"} text-black`}
        >
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`outline-none w-full p-3.75`}
            />
        </div>
    )
}

export default InputField
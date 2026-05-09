import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")));

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("darkMode", !darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) throw new Error("useTheme must be used within ThemeProvider");

    return context;
};

export default ThemeProvider;
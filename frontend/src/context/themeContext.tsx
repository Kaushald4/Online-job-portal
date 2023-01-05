import React, { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => {},
});

const ThemeProvider = ({ children }: any) => {
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        window.onload = () => {
            let savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                savedTheme = JSON.parse(savedTheme);
                document.documentElement.classList.add("dark");
                setDarkMode(true);
            } else {
                setDarkMode(false);
            }
        };
    }, []);

    const toggleTheme = () => {
        const theme = document.documentElement.classList;
        if (!theme.contains("dark")) {
            theme.add("dark");
            localStorage.setItem("theme", JSON.stringify(true));
            setDarkMode(true);
        } else {
            theme.remove("dark");
            localStorage.removeItem("theme");
            setDarkMode(false);
        }
    };
    return (
        <ThemeContext.Provider
            value={{
                isDarkMode,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

const useThemeMode = () => {
    return useContext(ThemeContext);
};
export { useThemeMode };

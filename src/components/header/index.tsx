'use client'
import { useEffect, useState } from "react";

export const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (theme === 'dark' || (!theme && prefersDarkMode)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode === null) return;
        const newMode = !isDarkMode;

        setIsDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');

        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    if (isDarkMode === null) {
        return null;
    }

    return (
        <div className="flex justify-between items-center px-4 py-4 bg-gray-100 dark:bg-gray-800 pl-10 pr-10">
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">BLOGS</p>

            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {isDarkMode ? "Dark" : "Light"} Mode
                </span>
                <button
                    onClick={toggleTheme}
                    className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1 flex items-center transition-colors duration-300"
                >
                    <div
                        className={`w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md transform ${
                            isDarkMode ? "translate-x-5" : "translate-x-0"
                        } transition-transform duration-300`}
                    ></div>
                </button>
            </div>
        </div>
    );
};

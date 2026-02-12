import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Force theme to be strictly 'dark'
    const theme = 'dark';

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        // Always apply dark mode classes
        root.classList.add('dark');
        body.classList.add('dark');

        // Ensure localStorage is set to dark to persist preference if we ever switch back
        localStorage.setItem('theme', 'dark');
    }, []);

    // No toggle function needed anymore
    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

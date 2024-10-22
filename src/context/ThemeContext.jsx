import { createContext, useState, useEffect } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const storedTheme = localStorage.getItem("theme") || "light";
	const [theme, setTheme] = useState(storedTheme);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

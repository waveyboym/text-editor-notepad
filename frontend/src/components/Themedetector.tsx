import { useState, useEffect } from "react";

const Themedetector = () => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getCurrentTheme());  
    const mqListener = ((e: { matches: boolean | ((prevState: boolean) => boolean); }) => {
        setIsDarkTheme(e.matches);
    });
    
    useEffect(() => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addEventListener('change',mqListener);
        return () => darkThemeMq.removeEventListener('change', mqListener);
    }, []);
    return isDarkTheme;
}

export default Themedetector;
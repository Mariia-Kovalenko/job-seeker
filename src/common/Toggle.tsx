import * as motion from "motion/react-client"
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Toggle({isOnComponent, offComponent, className}: {isOnComponent: React.ReactNode, offComponent: React.ReactNode, className?: string}) {
    const [isOn, setIsOn] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setIsOn(theme === "light");
    }, [theme]);

    return (
        <button
            className={`toggle-container ${className}`}
            style={{
                ...container,
                justifyContent: "flex-" + (isOn ? "start" : "end"),
            }}
            onClick={toggleTheme}
        >
            <motion.div
                className="toggle-handle"
                style={handle}
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            >
                {isOn ? isOnComponent : offComponent}
            </motion.div>
        </button>
    )
}

const container = {
    width: 65,
    height: 40,
    // backgroundColor: "#FFBCA1",
    borderRadius: 50,
    border: "1.5px solid #FF7A45",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 5,
}

const handle = {
    width: 30,
    height: 30,
    backgroundColor: "#FF7A45",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

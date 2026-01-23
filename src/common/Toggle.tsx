import * as motion from "motion/react-client";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Toggle({
  isOnComponent,
  offComponent,
  className,
}: {
  isOnComponent: React.ReactNode;
  offComponent: React.ReactNode;
  className?: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const [isOn, setIsOn] = useState(theme === "light");

  return (
    <button
      className={`toggle-container ${className}`}
      style={{
        ...container,
        justifyContent: "flex-" + (isOn ? "start" : "end"),
      }}
      onClick={() => {
        setIsOn(!isOn);
        toggleTheme();
      }}
    >
          <motion.div
            animate={{ x: isOn ? 0 : 1 }} // Manual calculation instead of layout
            className="toggle-handle"
            style={handle}
        >
        {isOn ? isOnComponent : offComponent}
      </motion.div>
    </button>
  );
}


const container = {
    width: 65,
    height: 40,
    // backgroundColor: "#FFBCA1",
    borderRadius: 50,
    display: "flex",
    border: "1.5px solid #FF7A45",
    cursor: "pointer",
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

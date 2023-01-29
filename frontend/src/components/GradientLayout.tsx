import MeshDarkBG from "../assets/mesh.png";
import MeshLightBG from "../assets/mesh2.png";
import { useThemeMode } from "../context/themeContext";

const GradientLayout = ({ children }: any) => {
    const { isDarkMode } = useThemeMode();

    return (
        <>
            <div
                style={{
                    backgroundImage: isDarkMode ? `url('${MeshDarkBG}')` : `url('${MeshLightBG}')`,
                    filter: isDarkMode ? "brightness(95%) contrast(200%)" : "grayscale(0)",
                    position: "fixed",
                    zIndex: -1,
                    inset: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
            <div className="relative z-10">{children}</div>
        </>
    );
};

export default GradientLayout;

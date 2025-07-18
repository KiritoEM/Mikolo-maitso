import { FC } from "react";
import logo from "../assets/image/Logo Dark.svg";
import logoDark from "../assets/image/Logo light.svg"; // Import de l'image
import { useTheme } from "../context/ThemeContext";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Logo: FC<LogoProps> = ({ size = "medium", className = "" }) => {
  // Tailles correspondantes pour l'image
  const sizeStyles = {
    small: "h-8", // ~32px
    medium: "h-12", // ~48px
    large: "h-16", // ~64px
  };

  const { isDarkMode } = useTheme();

  const logoSrc = !isDarkMode ? logoDark : logo;

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="Mikolo Maitso Logo"
        className={`${sizeStyles[size]} w-auto`}
      />
    </div>
  );
};

export default Logo;

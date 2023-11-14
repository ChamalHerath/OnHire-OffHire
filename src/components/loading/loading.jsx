import CompanyLogo from "../../assets/Images/CompanyLogo.svg";
import InvertedCompanyLogo from "../../assets/Images/VRentsLogoInverted.png";
import { themeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const Loading = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(themeContext);
  return (
    <div className="w-screen h-screen dark:bg-gray-900 bg-white">
      <div className="loading">
        <div className="b b1"></div>
        <div className="b b2"></div>
        <div className="b b3"></div>
        <div className="b b4"></div>
        <div className="logo-container">
          {isDarkTheme ? (
            <img
              src={InvertedCompanyLogo}
              className="h-8 mr-3"
              alt="Vrents Logo"
            />
          ) : (
            <img src={CompanyLogo} className="h-8 mr-3" alt="Vrents Logo" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Loading;

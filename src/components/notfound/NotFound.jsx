import { userContext } from "../../context/UserContext";
import { themeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";

const NotFound = () => {
  const { setUserLogged, userLogged } = useContext(userContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(themeContext);
  const navigate = useNavigate();

  const takeMeThere = () => {
    if (userLogged) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-24 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
            <div>
            <img className="dark:opacity-50" src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
              <h1 className="my-2 text-gray-800 font-bold text-2xl dark:text-white">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800 dark:text-white">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <button
                onClick={takeMeThere}
                className="sm:w-full lg:w-auto my-2 border rounded-full md py-4 px-8 text-center bg-yellow-700 text-white hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
              >
                Take me there!
              </button>
            </div>
          </div>
         
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default NotFound;

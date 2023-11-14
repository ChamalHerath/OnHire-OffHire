import React, { useState, useContext } from "react";
import CompanyLogo from "../../assets/Images/CompanyLogo.svg";
import { userContext } from "../../context/UserContext";
import { themeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  scheduleList,
  serviceHistory,
  unscheduledList,
} from "../../api-client";
import dayjs from "dayjs";
import { Spinner, Alert } from "@material-tailwind/react";
import { appDataContext } from "../../context/AppData";
import { loadingContext } from "../../context/LoadingContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserLogged, userLogged } = useContext(userContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(themeContext);
  const {
    isCheckListData,
    setCheckListData,
    scheduleListData,
    setScheduleListData,
    unScheduleListData,
    setUnScheduleListData,
    serviceHistoryData,
    setServiceHistoryData,
  } = useContext(appDataContext);
  const { isLoading, setIsLoading } = useContext(loadingContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const [startDate, setStartDate] = useState(dayjs(yesterday));
  const [endDate, setEndDate] = useState(dayjs(today));

  const handleLogin = async (e) => {
    setIsLoading(true);

    if (password === "1234") {
      sessionStorage.setItem("startDate", dayjs(startDate));
      sessionStorage.setItem("endDate", dayjs(endDate));

      let obj = { PlantCode: username, PlantType: "PLANT" };

      setUserLogged(obj);
      sessionStorage.setItem("user", JSON.stringify(obj));
      navigate("/dashboard");
      window.location.reload();
    } else {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }

    setIsLoading(false);
  };

  return (
      <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 bg-no-repeat bg-cover bg-fixed dark:bg-gray-900  bg-gray-300 bg-blend-screen dark:bg-blend-multiply bg-[url('https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/volvo-ce-electric-lineup?wid=1024')] h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={CompanyLogo} alt="VRents" />
          <p className="text-center font-extrabold p-4 text-[#F7BE1D] text-xl uppercase">
            Inspection <span className="text-[#58595B]">Tracker</span>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Plant Code
              </label>
              <div className="mt-2">
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                  type="button"
                  onClick={handleLogin}
                  className="flex w-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {isLoading ? (
                    <Spinner className=" text-gray-800/60 mr-2" />
                ) : (
                    <div></div>
                )}
                Sign in
              </button>
              <Alert
                  open={open}
                  icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6">
                      <path
                          fillRule="evenodd"
                          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                      />
                    </svg>
                  }
                  className="mt-5 text-sm rounded-none border-l-4 border-red-500 bg-red-500/10 font-medium text-red-500">
                Login Failed! Incorrect Email or Password
              </Alert>
            </div>
          </form>
        </div>
      </div>
  );
}

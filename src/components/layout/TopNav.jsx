import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { checkList } from "../../api-client/checkList";
import avatarProfile from "../../assets/Images/avatarProfile.jpeg";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  ButtonGroup,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

import CompanyLogo from "../../assets/Images/CompanyLogo.svg";
import InvertedCompanyLogo from "../../assets/Images/VRentsLogoInverted.png";
import { userContext } from "../../context/UserContext";
import { themeContext } from "../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import SideBarPanel from "../layout/SideBarPanel";
import { appDataContext } from "../../context/AppData";
import Loading from "../loading/loading";
import { loadingContext } from "../../context/LoadingContext";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { setUserLogged, userLogged } = useContext(userContext);
  const {
    isCheckListData,
    setCheckListData,
    scheduleListData,
    setScheduleListData,
  } = useContext(appDataContext);

  const navigate = useNavigate();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={avatarProfile}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform dark:text-white ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          key="customer"
          className="flex items-center gap-2 rounded hover:bg-gray-500/10 focus:bg-gray-500/10 active:bg-gray-500/10">
          <Typography variant="small" className="font-bold" color="black">
            {userLogged.custName}
          </Typography>
        </MenuItem>
        <MenuItem
          key="sign-out"
          onClick={() => {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("checklist");
            sessionStorage.removeItem("rentalorder");
            sessionStorage.removeItem("schedulelist");

            setUserLogged(false);
            setCheckListData(false);
            setScheduleListData(false);
            setTimeout(() => {
              navigate("/login");
              window.location.reload();
            }, 1000);
          }}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10">
          <Typography
            variant="small"
            className="font-normal  inline-flex"
            color="red">
            <ArrowLeftCircleIcon className="w-[20px] mr-2" /> Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Dashboard",
    icon: PresentationChartBarIcon,
    link: "/dashboard",
  },
  {
    label: "Scheduled Inspection",
    icon: CalendarDaysIcon,
    link: "/scheduledInspection",
  },
  {
    label: "Un-Scheduled",
    icon: CalendarDaysIcon,
    link: "/unScheduledInspection",
  },
  {
    label: "Service History",
    icon: WrenchScrewdriverIcon,
    link: "/serviceHistory",
  },
];

function NavList() {
  const { isDarkTheme, setIsDarkTheme } = useContext(themeContext);
  const textColor = isDarkTheme ? "white" : "blue-gray";
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, link }, key) => (
        <Link to={link} key={key}>
          <Typography
            key={label}
            href="#"
            variant="small"
            color={textColor}
            className="font-normal">
            <MenuItem
              key={label}
              className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );
}

export function TopNav() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [temporaryStartDate, setTemporaryStartDate] = useState("");
  const [temporaryEndDate, setTemporaryEndDate] = useState("");

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const { setUserLogged, userLogged } = useContext(userContext);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(loadingContext);
  const { isCheckListData, setCheckListData, isROHData, setROHData } =
    useContext(appDataContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(themeContext);
  const textColor = isDarkTheme ? "white" : "blue-gray";
  const ChangeTheme = () => {
    setIsDarkTheme((prevState) => !prevState);
    document.documentElement.classList.toggle("dark");
    sessionStorage.setItem("theme", JSON.stringify({ dark: !isDarkTheme }));
  };
  const [openDate, setOpenDate] = useState(false);
  const handleOpenDate = () => {
    setStartDate(temporaryStartDate);
    setEndDate(temporaryEndDate);
    setOpenDate(!openDate);
  };

  const handleFetchAll = async () => {
    setIsLoading(true);
    setTemporaryEndDate(endDate);
    setTemporaryStartDate(startDate);
    sessionStorage.setItem("startDate", dayjs(startDate));
    sessionStorage.setItem("endDate", dayjs(endDate));
    setOpenDate(false);
    await handleFetch();
    //await handleRentalFetch();
    setIsLoading(false);
  };

  const handleFetch = async (e) => {
    const checklistData = await checkList(
      userLogged.custCode,
      dayjs(startDate).format("YYYY-MM-DD"),
      dayjs(endDate).format("YYYY-MM-DD"),
      "",
      ""
    );

    if (checklistData && checklistData.status == 200) {
      setCheckListData(checklistData.data.result);
      sessionStorage.setItem(
        "checklist",
        JSON.stringify(checklistData.data.result)
      );
    } else if (checklistData && checklistData.status == 500) {
      setCheckListData(false);
    } else {
      setCheckListData(false);
    }
  };

  // Date : 07-09-2023
  // Chris Does not want this functionality at this point
  // const handleRentalFetch = async (e) => {

  //   const rentalData = await rentalorder(
  //     userLogged.custCode,
  //     dayjs(startDate).format("YYYY-MM-DD"),
  //     dayjs(endDate).format("YYYY-MM-DD")

  //   );

  //   if (rentalData && rentalData.status == 200) {
  //     setROHData(rentalData.data.result);
  //     sessionStorage.setItem(
  //       "rentalorder",
  //       JSON.stringify(rentalData.data.result)
  //     );
  //   } else if (rentalData && rentalData.status == 500) {
  //     setROHData(false);
  //   } else {
  //     setROHData(false);
  //   }
  // };

  const dateRangeHelper = (value) => {
    if (value == 0) {
      setStartDate(dayjs(yesterday));
      setEndDate(dayjs(today));
    } else if (value == 1) {
      yesterday.setDate(today.getDate() - 30);
      setStartDate(dayjs(yesterday));
      setEndDate(dayjs(today));
    } else if (value == 2) {
      yesterday.setDate(today.getDate() - 365);
      setStartDate(dayjs(yesterday));
      setEndDate(dayjs(today));
    }
  };

  useEffect(() => {
    let startDatestorage = sessionStorage.getItem("startDate");
    let endDatestorage = sessionStorage.getItem("endDate");

    if (startDatestorage) {
      //console.log(startDatestorage);
      setStartDate(dayjs(startDatestorage));
      setTemporaryStartDate(dayjs(startDatestorage));
    }
    if (endDatestorage) {
      //console.log(endDatestorage);
      setEndDate(dayjs(endDatestorage));
      setTemporaryEndDate(dayjs(endDatestorage));
    }
    if (!startDatestorage || !endDatestorage) {
      setStartDate(dayjs(yesterday));
      setTemporaryStartDate(dayjs(yesterday));
      setEndDate(dayjs(today));
      setTemporaryEndDate(dayjs(today));
    }
  }, []);

  return (
    <Navbar className=" max-w-full p-2 rounded-none  bg-gray-100  dark:bg-gray-800 border-none ">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
          {isDarkTheme ? (
            <img
              src={InvertedCompanyLogo}
              className="h-8 mr-3"
              alt="Vrents Logo"
            />
          ) : (
            <img src={CompanyLogo} className="h-8 mr-3" alt="Vrents Logo" />
          )}
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block text-center">
          {/* <NavList /> */}{" "}
          <Typography
            variant="h3"
            color={isDarkTheme ? "white" : "blue-gray"}
            className="cursor-pointer font-extrabold">
            <p className="text-center text-[#F7BE1D] uppercase">
              Inspection{" "}
              <span className="text-[#58595B] dark:text-white">Tracker</span>
            </p>
            {/* {userLogged.custName}{" "} */}
          </Typography>
          <p className="font-normal text-md dark:text-white ">
            Selected Date Range :{" "}
            <span className="font-bold text-blue-gray-600 dark:text-blue-gray-200">
              {dayjs(startDate).format("MMMM D, YYYY")}
            </span>
            {" to "}
            <span className="font-bold  text-blue-gray-600 dark:text-blue-gray-200">
              {dayjs(endDate).format("MMMM D, YYYY")}
            </span>
          </p>
        </div>

        <IconButton
          size="sm"
          color={textColor}
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden">
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        {userLogged ? (
          <ProfileMenu />
        ) : (
          <Button
            className="ml-auto mr-5 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => {
              navigate("/login");
            }}>
            Login
          </Button>
        )}
        <Button
          onClick={handleOpenDate}
          icon="gradient"
          className="ml-2 dark:bg-amber-600/80 dark:text-black">
          <CalendarDaysIcon className="w-[25px]" />
        </Button>
        <Dialog open={openDate} size="xl" handler={handleOpenDate}>
          <DialogHeader className="justify-center p-3">
            Select a Date Range
          </DialogHeader>
          <DialogBody className="h-[70vh] lg:h-full overflow-y-scroll" divider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="flex-none">
                  <StaticDatePicker
                    slotProps={{
                      actionBar: { actions: null },
                    }}
                    maxDate={endDate}
                    orientation="portrait"
                    disableFuture
                    value={startDate}
                    label="Start Date"
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </div>
                <div className="flex-none">
                  <StaticDatePicker
                    disableFuture
                    slotProps={{
                      actionBar: { actions: null },
                    }}
                    minDate={startDate}
                    orientation="portrait"
                    value={endDate}
                    label="End Date"
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </div>
              </div>
            </LocalizationProvider>
          </DialogBody>
          <DialogFooter className="justify-between">
            <ButtonGroup className="py-5 lg:p-0">
              <Button
                variant="filled"
                color="gray"
                onClick={() => dateRangeHelper(0)}>
                <span>Last 24 hrs</span>
              </Button>
              <Button
                variant="filled"
                color="gray"
                onClick={() => dateRangeHelper(1)}>
                <span>Last 30 Days</span>
              </Button>
              <Button
                variant="filled"
                color="gray"
                onClick={() => dateRangeHelper(2)}>
                <span>Last Year</span>
              </Button>
            </ButtonGroup>

            <Button variant="gradient" color="green" onClick={handleFetchAll}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <button
          className=" hover:bg-slate-300 p-1 rounded-full"
          onClick={ChangeTheme}>
          <div className="mx-5">
            {isDarkTheme ? (
              <MoonIcon stroke="white" className="w-[25px]" />
            ) : (
              <SunIcon stroke="black" className="w-[25px]" />
            )}
          </div>
        </button>
      </div>
      <Collapse
        open={isNavOpen}
        onClick={toggleIsNavOpen}
        className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { themeContext } from "../../context/ThemeContext";
import { loadingContext } from "../../context/LoadingContext";
import Loading from "../loading/loading";
import avatarProfile from "../../assets/Images/avatarProfile.jpeg";
import {
  InformationCircleIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import "react-datepicker/dist/react-datepicker.css";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  Chip,
  Avatar,
  ButtonGroup,
} from "@material-tailwind/react";

import NexGenTable from "../../generic/NexGenTable";
import { appDataContext } from "../../context/AppData";
import { useParams } from "react-router-dom";

const ChecklistHistory = () => {
  const { isLoading, setIsLoading } = useContext(loadingContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(themeContext);
  const { isCheckListData, setCheckListData } = useContext(appDataContext);
  const { params } = useParams();

  console.log("checlist dtaa in the function", isCheckListData);

  const [open, setOpen] = useState(false);
  const [keyc, setKeyc] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [checklistStatusValue, setChecklistStatusValue] = useState("ALL");
  const [searchedData, setSearchedData] = useState(null); //Data Coming From API
  const [pclData, setPclData] = useState("");
  const [simulateLoad, setSimulateLoad] = useState(true);

  useEffect(() => {
    if (params) {
      if (params == "All") {
        setChecklistStatusValue("ALL");
      } else if (params == "CT") {
        setChecklistStatusValue("CT");
      } else if (params == "NCT") {
        setChecklistStatusValue("NCT");
      } else if (params == "OK") {
        setChecklistStatusValue("OK");
      }
    }
    //chris requested the loading screen
    setTimeout(() => {
      setSimulateLoad(false);
      setIsLoading(false);
    }, 750);
  }, []);

  useEffect(() => {
    setKeyc(keyc + 1);
    if (params) {
      //console.log(params);
    }

    if (isCheckListData) {
      setSearchedData(
        isCheckListData.filter(
          (item) =>
            (item.pclId.toString().includes(searchValue.toLowerCase()) ||
              item.plantCode
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              item.roid.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.operatorFullName
                .toLowerCase()
                .includes(searchValue.toLowerCase())) &&
            (item.response.toLocaleLowerCase() ==
              checklistStatusValue.toLocaleLowerCase() ||
              checklistStatusValue.toLocaleLowerCase() == "all")
        )
      );
    } else {
      setSearchedData(null);
    }
    //setIsLoading(false);
  }, [searchValue, checklistStatusValue, isCheckListData]);

  const handleOpen = () => setOpen(!open);

  const machineInfoRedirect = async (value) => {
    let link = await machineInfo(value);

    if (link && link.status == 200) {
      let gDriveLink = "#";
      try {
        gDriveLink = link.data.result.filter((item) =>
          item.googleDriveLink.startsWith(
            "https://drive.google.com/drive/folders"
          )
        );
      } catch {}
      window.open(gDriveLink[0].googleDriveLink, "_blank");
    } else {
      // console.log("nolink");
    }

    //window.open("#", "_blank");
  };

  const dialogOpen = (value) => {
    setPclData(
      searchedData
        .map(({ pclId, checklist, plantCode, completedDate }) => ({
          pclId,
          checklist,
          plantCode,
          completedDate,
        }))
        .filter((item) => item.pclId == value)
    );
    handleOpen();
  };

  const headerClass = "dark:text-black bg-gray-300 dark:bg-gray-700/80";

  const columns = [
    {
      field: "pclId",
      headerName: "Checklist ID",
      headerClassName: headerClass,
      headerAlign: "center",
      flex: 100,
      minWidth: 100,
      renderCell: (params) => {
        let responseValue = params.row.response;
        return (
          <Button
            className={`py-2 w-[80px] dark:bg-white dark:text-black text-center mx-auto ${
              responseValue === "OK"
                ? "bg-black"
                : responseValue === "NCT"
                ? "bg-yellow-700"
                : "bg-red-700 text-white"
            }`}
            onClick={() => dialogOpen(params.value)}
            variant="filled">
            {params.value}
          </Button>
        );
      },
    },
    {
      field: "plantCode",
      headerName: "Plant Code",
      headerClassName: headerClass,
      headerAlign: "center",

      renderCell: (params) => (
        <div
          className="cursor-pointer ml-4 flex items-center group "
          onClick={() => machineInfoRedirect(params.row.plantNo)}>
          <p className="dark:text-white text-center font-bold group-hover:text-red-500">
            {params.value}{" "}
          </p>
          <InformationCircleIcon className="ml-1 w-[25px] text-blue-gray-500 group-hover:text-red-500 " />
        </div>
      ),
      flex: 120,
      minWidth: 120,
    },
    {
      field: "meterReading",
      headerName: "Meter Reading",
      headerClassName: headerClass,
      headerAlign: "center",
      type: "number",
      renderCell: (params) => (
        <p className=" dark:text-white text-center mx-auto">{params.value}</p>
      ),
      flex: 125,
      minWidth: 125,
    },
    {
      field: "roid",
      headerName: "Rental Order ID",
      headerClassName: headerClass,
      headerAlign: "center",
      type: "number",
      renderCell: (params) => (
        <p className=" dark:text-white text-center mx-auto">{params.value}</p>
      ),
      flex: 120,
      minWidth: 120,
    },
    {
      field: "project",
      headerName: "Rental Order Project",
      headerClassName: headerClass,
      headerAlign: "center",
      flex: 170,
      minWidth: 170,
      renderCell: (params) => (
        <p className=" dark:text-white text-center mx-auto">{params.value}</p>
      ),
    },
    {
      field: "operatorFullName",
      headerName: "Operator Name",
      headerClassName: headerClass,
      headerAlign: "center",
      flex: 170,
      minWidth: 170,
      renderCell: (params) => (
        <Chip
          icon={
            <Avatar
              size="sm"
              variant="circular"
              className="h-full w-full -translate-x-0.5 dark:text-black"
              alt={params.value}
              src={avatarProfile}
            />
          }
          value={
            <Typography
              variant="small"
              className="font-medium capitalize leading-none dark:text-black">
              {params.value}
            </Typography>
          }
          className="rounded-full text-center py-2 w-[150px] dark:bg-white"
        />
      ),
    },
    {
      field: "contactNo",
      headerName: "Operator Mobile",
      headerClassName: headerClass,
      headerAlign: "center",
      renderCell: (params) => (
        <p className=" dark:text-white text-center mx-auto">{params.value}</p>
      ),
      flex: 170,
      minWidth: 170,
    },
    {
      field: "completedDate",
      headerName: "Completed Date",
      headerClassName: headerClass,
      headerAlign: "center",
      renderCell: (params) => (
        <p className=" dark:text-white text-center mx-auto">{params.value}</p>
      ),
      flex: 160,
      minWidth: 160,
    },
    {
      field: "response",
      headerName: "Response",
      flex: 135,
      minWidth: 135,
      headerClassName: headerClass,
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {params.value == "OK" && (
            <Chip
              className="text-center bg-green-500 w-[120px]"
              variant="ghost"
              size="sm"
              value={params.value}
            />
          )}
          {params.value == "NCT" && (
            <Chip
              className="text-center bg-yellow-700 w-[120px]"
              variant="ghost"
              size="sm"
              value="NON-CRITICAL"
            />
          )}
          {params.value == "CT" && (
            <Chip
              className="text-center text-white bg-red-700 w-[120px]"
              variant="ghost"
              size="sm"
              value="CRITICAL"
            />
          )}
        </>
      ),
    },
    {
      field: "workOrderNo",
      headerName: "Work Order No",
      headerClassName: headerClass,
      headerAlign: "center",
      flex: 145,
      minWidth: 145,
      renderCell: (params) => (
        <p className=" dark:text-white text-center mx-auto">{params.value}</p>
      ),
    },
    {
      field: "workOrderStatus",
      headerName: "Work Order Status",
      headerClassName: headerClass,
      headerAlign: "center",
      flex: 145,
      minWidth: 145,
      renderCell: (params) => (
        <p className=" dark:text-white text-center mx-auto">{params.value}</p>
      ),
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];

  if (isLoading || simulateLoad) {
    return <Loading />;
  }
  return (
    <>
      <div className=" m-5 my-10   max-h-screen dark:bg-gray-900">
        <Card className="mt-5 w-full rounded-none shadow-none dark:bg-gray-900">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none overflow-visible">
            <div className="flex flex-wrap items-center justify-between dark:bg-gray-900">
              <p className="text-center text-4xl font-bold  dark:text-blue-gray-200">
                Checklist History
              </p>
              <div className="flex flex-wrap items-center justify-end gap-4 dark:bg-gray-900">
                <div className="w-[376px]">
                  <ButtonGroup>
                    <Button
                      className={`border-none focus:opacity-100 ${
                        checklistStatusValue === "ALL"
                          ? "bg-gradient-to-t from-gray-400 via-black to-black"
                          : "bg-black"
                      }`}
                      onClick={() => setChecklistStatusValue("ALL")}>
                      All
                    </Button>
                    <Button
                      className={`border-none focus:opacity-100 text-black ${
                        checklistStatusValue === "OK"
                          ? "bg-gradient-to-t from-black via-green-400 to-green-400"
                          : "bg-green-400"
                      }`}
                      onClick={() => setChecklistStatusValue("OK")}>
                      OK
                    </Button>
                    <Button
                      className={`border-none focus:opacity-100 text-black ${
                        checklistStatusValue === "NCT"
                          ? "bg-gradient-to-t from-black via-amber-400 to-amber-400"
                          : "bg-amber-400"
                      }`}
                      onClick={() => setChecklistStatusValue("NCT")}>
                      Non-Critical
                    </Button>
                    <Button
                      className={`border-none focus:opacity-100 text-black ${
                        checklistStatusValue === "CT"
                          ? "bg-gradient-to-t from-black via-red-400 to-red-400"
                          : "bg-red-400"
                      }`}
                      onClick={() => setChecklistStatusValue("CT")}>
                      Critical
                    </Button>
                  </ButtonGroup>
                </div>

                <div className="w-[400px]">
                  <Input
                    className=""
                    color={isDarkTheme ? "white" : "black"}
                    //color="white"
                    value={searchValue}
                    id="search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    label="Search"
                    icon={
                      <MagnifyingGlassIcon className="h-5 w-5 dark:text-white" />
                    }
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          {searchedData ? (
            <NexGenTable
              key={keyc}
              columns={columns}
              rows={searchedData.map(
                ({
                  pclId,
                  plantCode,
                  meterReading,
                  roid,
                  project,
                  operatorFullName,
                  contactNo,
                  completedDate,
                  response,
                  workOrderNo,
                  workOrderStatus,

                  plantNo,
                }) => ({
                  pclId,
                  plantCode,
                  meterReading,
                  roid,
                  project,
                  operatorFullName,
                  contactNo,
                  completedDate,
                  response,
                  workOrderNo,
                  workOrderStatus,

                  plantNo,
                })
              )}
              height={() => 60}
              getRowId={(row) => row.pclId}
            />
          ) : (
            <p className="text-red-600 text-center pt-10 font-semibold">
              *No data available.
            </p>
          )}
        </Card>
      </div>

      <Dialog
        open={open}
        size="xl"
        handler={handleOpen}
        className="dark:bg-gray-800">
        <DialogHeader className="justify-center p-5">
          <Typography className="text-center" variant="h5" color="blue-gray">
            <span className="p-2 mr-5 bg-gray-200 rounded-lg">
              Checklist ID: {pclData && pclData[0].pclId}
            </span>
            <span className="p-2 mr-5 bg-gray-200 rounded-lg">
              Plant Code: {pclData && pclData[0].plantCode}
            </span>
            <span className="p-2 bg-gray-200 rounded-lg">
              Date: {pclData && pclData[0].completedDate}
            </span>
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <Card className="h-[70vh] w-full overflow-scroll rounded-none dark:bg-black">
            <table className="w-full min-w-max table-auto text-start">
              <thead>
                <tr>
                  <th
                    key="PCL CODE"
                    className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      Checklist Code
                    </Typography>
                  </th>
                  <th
                    key="Status"
                    className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      Status
                    </Typography>
                  </th>
                  <th
                    key="Comment"
                    className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      Comment
                    </Typography>
                  </th>
                  <th
                    key="Description"
                    className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      Description
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pclData &&
                  pclData[0].checklist.map(
                    ({ pclCode, description, response, comment }, index) => {
                      const isLast = index === pclData[0].checklist.length - 1;
                      const classes = isLast
                        ? "p-2 text-center dark:text-white"
                        : "p-2 text-center dark:text-white border-b border-blue-gray-50 dark:border-gray-800";

                      const descriptionclass = isLast
                        ? "p-2 text-left "
                        : "p-2 text-left border-b border-blue-gray-50 dark:border-gray-800";

                      return (
                        <tr
                          key={pclCode}
                          className="dark:bg-gray-900 even:bg-blue-gray-50/50 dark:even:bg-gray-800">
                          <td className={classes}>
                            <Typography variant="small" className="font-normal">
                              {pclCode}
                            </Typography>
                          </td>
                          <td className={classes}>
                            {response == "OK" && (
                              <Chip
                                className="text-center text-white bg-green-500 "
                                variant="ghost"
                                size="sm"
                                value={response}
                                // icon={
                                //   <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                // }
                              />
                            )}
                            {response == "NCT" && (
                              <Chip
                                className="text-center text-white bg-yellow-700 "
                                variant="ghost"
                                size="sm"
                                value={response}
                              />
                            )}
                            {response == "CT" && (
                              <Chip
                                className="text-center text-white bg-red-700 "
                                variant="ghost"
                                size="sm"
                                value={response}
                              />
                            )}
                          </td>
                          <td className={classes}>
                            <Typography variant="small" className="font-normal">
                              {comment}
                            </Typography>
                          </td>
                          <td className={descriptionclass}>
                            <Typography
                              variant="small"
                              className="font-normal dark:text-white">
                              {description}
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            className="bg-red-700 text-white hover:bg-red-800"
            onClick={handleOpen}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ChecklistHistory;

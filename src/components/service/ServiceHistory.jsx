import React, { useContext, useEffect, useState } from "react";
import { userContext, appDataContext, loadingContext } from "../../context";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import Loading from "../loading/loading";
import NexGenTable from "../../generic/NexGenTable";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import NexGenImageUpload from "../../generic/NexGenImageUpload";
import { getSingleCheckListData } from "../../api-client";

const headerClass = "dark:text-black bg-gray-300 dark:bg-gray-700/80";
const ServiceHistory = () => {
  const { isLoading, setIsLoading } = useContext(loadingContext);
  const { serviceHistoryData, singleSelectionData, setSingleSelectionData } = useContext(appDataContext);
  const { userLogged } = useContext(userContext);

  console.log("History List Data ------> ", serviceHistoryData);

  const [simulateLoad, setSimulateLoad] = useState(true);
  const [keyc, setKeyc] = useState(1);
  const [open, setOpen] = useState(false);
  const [serviceListData, setServiceListData] = useState(serviceHistoryData);
  const [selectedData, setSelectedData] = useState(null);

  const prepareData = () => {
    let updatedArray = [];

    if (serviceHistoryData) {
      serviceHistoryData.forEach((element) => {
        updatedArray.push({
          ...element,
          CompletedDate: element.CompletedDate.split("T")[0],
        });
      });
    }
    setServiceListData(updatedArray);
  };

  const getSingleData = async (values) => {
    const singleData = await getSingleCheckListData(values);

    setSingleSelectionData(singleData);
  };

  useEffect(() => {
    prepareData();
    setTimeout(() => {
      setSimulateLoad(false);
      setIsLoading(false);
    }, 750);
  }, []);

  const handleOpen = () => setOpen(!open);

  const handleSelection = (element) => {
    setSelectedData(element);
    getSingleData(element);
    setTimeout(() => {}, 1000);
    setOpen(true);
  };

  const dialogOpen = (value) => {
    setServiceListData(
      serviceListData
        .map(({ CL_ID, PlantDesc, servicelist, RO_ID, CompletedDate, MeterReading }) => ({
          CL_ID,
          PlantDesc,
          servicelist,
          RO_ID,
          CompletedDate,
          MeterReading,
        }))
        .filter((item) => item.CL_ID == value)
    );
    handleOpen();
  };

  const SERVICE_LIST_COLUMNS = [
    {
      field: "CL_ID",
      headerName: "Checklist ID",
      headerClassName: headerClass,
      headerAlign: "center",
      flex: 120,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <Button
            title="Open Checklist"
            className="py-3 w-[120px] dark:bg-white dark:text-black text-center mx-auto bg-[#2971ff]"
            onClick={() => {
              handleSelection(params.row);
            }}
            variant="filled">
            {params.value}
          </Button>
        );
      },
    },
    {
      field: "RO_ID",
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
      field: "MeterReading",
      headerName: "Meter Reading",
      headerClassName: headerClass,
      headerAlign: "center",
      renderCell: (params) => (
        <p className="dark:text-white text-center mx-auto group-hover:text-red-500">
          {params.value}
        </p>
      ),
      flex: 160,
      minWidth: 160,
    },
    {
      field: "CompletedDate",
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
      field: "Status",
      headerName: "Status",
      flex: 135,
      minWidth: 135,
      headerClassName: headerClass,
      headerAlign: "center",
      renderCell: (params) => (
        <div className="text-center mx-auto">
          {params.value == "1" && (
            <Chip
              className="text-center text-white bg-green-500 w-[120px] py-2"
              variant="ghost"
              size="sm"
              value="ON"
            />
          )}
          {params.value == "2" && (
            <Chip
              className="text-center text-white bg-red-700 w-[120px] py-2"
              variant="ghost"
              size="sm"
              value="ÖFF"
            />
          )}
        </div>
      ),
    },
  ];

  if (isLoading || simulateLoad) {
    return <Loading />;
  }

  return (
    <>
      <div className=" m-5 my-10 max-h-screen dark:bg-gray-900">
        <Card className="mt-5 w-full rounded-none shadow-none dark:bg-gray-900">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none overflow-visible">
            <div className="flex flex-wrap items-center justify-between dark:bg-gray-900">
              <p className="text-center text-4xl font-bold  dark:text-blue-gray-200">
                Service History
              </p>
              <span className="py-2 rounded-lg font-semibold w-[220px] dark:bg-white text-white dark:text-black text-center mx-auto bg-[#2971ff]">
                Plant Code : {userLogged.PlantCode}
              </span>
            </div>
          </CardHeader>

          {/* Table Data */}
          {serviceListData ? (
            <NexGenTable
              key={keyc}
              columns={SERVICE_LIST_COLUMNS}
              rows={serviceListData.map(
                ({
                  CL_ID,
                  RO_ID,
                  MeterReading,
                  CompletedDate,
                  Status,
                  PlantDesc,
                }) => ({
                  CL_ID,
                  RO_ID,
                  MeterReading,
                  CompletedDate,
                  Status,
                  PlantDesc,
                })
              )}
              height={() => 60}
              getRowId={(row) => row.CL_ID}
            />
          ) : (
            <p className="text-red-600 text-center pt-10 font-semibold">
              No data available.
            </p>
          )}
        </Card>
      </div>

      {/* Popup */}
      <Dialog
        open={open}
        size="xl"
        handler={handleOpen}
        className="dark:bg-gray-800">
        <DialogHeader className="justify-center p-3">
          <Typography className="text-center" variant="h5" color="blue-gray">
            <div className="flex flex-row justify-between mx-auto rounded-lg p-2 text-white text-base">
              <span className="p-2 mr-3 bg-[#2971ff] rounded-lg">
                Checklist ID: {selectedData?.CL_ID}
              </span>
              <span className="p-2 mr-3 bg-[#2971ff] rounded-lg">
                Plant: {selectedData?.PlantDesc}
              </span>
              <span className="p-2 mr-3 bg-[#2971ff] rounded-lg">
                RO No: {selectedData?.RO_ID}
              </span>
              <span className="p-2 mr-3 bg-[#2971ff] rounded-lg">
                Completed Date: {selectedData?.CompletedDate}
              </span>
              <span className="p-2 bg-[#2971ff] rounded-lg">
                Meter Readings: {selectedData?.MeterReading}
              </span>
            </div>
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
                      className="font-bold text-left leading-none opacity-70 dark:text-white ">
                      Checklist Items
                    </Typography>
                  </th>
                  <th
                    key="PCL CODE"
                    className="border-y flex space-x-16 border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      N/A
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      Yes
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      No
                    </Typography>
                  </th>
                  <th
                    key="Status"
                    className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      Lubricant Amount
                    </Typography>
                  </th>
                  <th
                    key="Comment"
                    className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      Images
                    </Typography>
                  </th>
                  <th
                    key="Description"
                    className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      On-Charge
                    </Typography>
                  </th>
                  <th
                    key="Description"
                    className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 dark:text-white ">
                      Comment
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
              {singleSelectionData &&
                  singleSelectionData.map((item) => {
                    return (
                        <React.Fragment key={item?.ItemOrder}>
                          <tr className="dark:bg-gray-900 even:bg-blue-gray-50/50 dark:even:bg-gray-800">
                            <div className="flex p-4 text-left dark:text-black bg-gray-200">
                              <td className="max-w-[160px]">
                                {item?.Description}
                              </td>
                              <InformationCircleIcon
                                  title={item?.Information}
                                  className="ml-6 cursor-pointer w-[25px] text-blue-gray-500 hover:text-red-500 "
                              />
                            </div>
                            <td className="p-0 text-center dark:text-white bg-gray-200">
                              <List className="flex-row ">
                                <ListItem className="inline-block float-left text-center w-11 mr-10">
                                  <ListItemPrefix>
                                    <Radio
                                        name="horizontal-list"
                                        id="horizontal-list-react"
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        checked={item?.Response === 0}
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                    />
                                  </ListItemPrefix>
                                </ListItem>
                                <ListItem className="inline-block float-left text-center w-11 mr-9">
                                  <ListItemPrefix>
                                    <Radio
                                        name="horizontal-list"
                                        id="horizontal-list-react"
                                        ripple={false}
                                        checked={item?.Response === 1}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                    />
                                  </ListItemPrefix>
                                </ListItem>
                                <ListItem className="inline-block float-left text-center w-11">
                                  <ListItemPrefix>
                                    <Radio
                                        name="horizontal-list"
                                        id="horizontal-list-react"
                                        ripple={false}
                                        checked={item?.Response === 2}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                    />
                                  </ListItemPrefix>
                                </ListItem>
                              </List>
                            </td>
                            <td className="p-2 text-center dark:text-white bg-gray-200">
                              <Input
                                  type="number"
                                  value={item?.LubricantAmount}
                                  className=""
                                  color="black"
                                  label="Lubricant Amount"
                                  readonly
                              />
                            </td>
                            <td className="p-2 text-center dark:text-black bg-gray-200">
                              <div className="flex justify-between gap-2 mx-auto">
                                <NexGenImageUpload />
                                <NexGenImageUpload />
                                <NexGenImageUpload />
                              </div>
                            </td>
                            <td className="p-2 text-center dark:text-white bg-gray-200">
                              <Checkbox checked={item?.OnCharge} />
                            </td>
                            <td className="p-2 text-center dark:text-white bg-gray-200">
                              <Input
                                  type="text"
                                  className=""
                                  color="black"
                                  label="Comment"
                                  value={item?.Comments}
                                  readonly
                              />
                            </td>
                          </tr>
                        </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </Card>
        </DialogBody>
        <DialogFooter>
          <div className="space-x-6">
            <Button
              onClick={handleOpen}
              variant="text"
              className="bg-red-700 text-white hover:bg-red-800">
              <span>Close</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ServiceHistory;

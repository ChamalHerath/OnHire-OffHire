import React, { useContext, useState, useEffect } from "react";
import { userContext, appDataContext, loadingContext } from "../../context";
import Loading from "../loading/loading";
import "react-datepicker/dist/react-datepicker.css";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardHeader,
  Input,
  Typography,
  Button,
  Chip,
  Radio,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import NexGenTable from "../../generic/NexGenTable";
import NexGenImageUpload from "../../generic/NexGenImageUpload";
import { getSingleCheckListData } from "../../api-client";

const headerClass = "dark:text-black bg-gray-300 dark:bg-gray-700/80";

const UnScheduleInspectionView = () => {
  const { isLoading, setIsLoading } = useContext(loadingContext);
  const { unScheduleListData, singleSelectionData, setSingleSelectionData } = useContext(appDataContext);
  const { userLogged } = useContext(userContext);

  console.log("UnSchedule List Data : ", unScheduleListData);

  const [simulateLoad, setSimulateLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [keyc, setKeyc] = useState(1);
  const [unScheduleData, setUnScheduleData] = useState(unScheduleListData);
  const [selectedData, setSelectedData] = useState(null);

  const prepareData = () => {
    let updatedArray = [];

    if (unScheduleListData && Array.isArray(unScheduleListData)) {
      unScheduleListData.forEach((element) => {
        updatedArray.push({
          ...element,
          DueDate: element.DueDate?.split("T")[0],
        });
      });
    } else if (unScheduleListData) {
      updatedArray.push({
        ...unScheduleListData,
        DueDate: unScheduleListData.DueDate?.split("T")[0],
      });
    }
    setUnScheduleData(updatedArray);
  };

  const getSingleData = async (event) => {
    const singleData = await getSingleCheckListData(event);

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

  const UNSCHEDULED_LIST_COLUMNS = [
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
            className="py-3 w-[120px] dark:bg-white dark:text-black text-center mx-auto bg-[#58595B]"
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
      field: "DueDate",
      headerName: "Due Date",
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
          {params.value == "O2" && (
            <Chip
              className="text-center text-white bg-red-700 w-[120px] py-2"
              variant="ghost"
              size="sm"
              value="OFF"
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
                Un-Scheduled Inspection
              </p>
              <span className="py-2 rounded-lg font-semibold w-[220px] dark:bg-white text-white dark:text-black text-center mx-auto bg-[#58595B]">
                Plant Code : {userLogged.PlantCode}
              </span>
            </div>
          </CardHeader>

          {/* Table Data */}
          {unScheduleData ? (
            <NexGenTable
              key={keyc}
              columns={UNSCHEDULED_LIST_COLUMNS}
              rows={unScheduleData.map(
                ({
                  CL_ID,
                  RO_ID,
                  MeterReading,
                  DueDate,
                  Status,
                  PlantDesc,
                }) => ({
                  CL_ID,
                  RO_ID,
                  MeterReading,
                  DueDate,
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
              <span className="p-2 mr-3 bg-[#58595B] rounded-lg">
                Checklist ID: {selectedData?.CL_ID}
              </span>
              <span className="p-2 mr-3 bg-[#58595B] rounded-lg">
                Plant: {selectedData?.PlantDesc}
              </span>
              <span className="p-2 mr-3 bg-[#58595B] rounded-lg">
                RO No: {selectedData?.RO_ID}
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
                                        checked={item?.Response === 1}
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
                                        checked={item?.Response === 2}
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
                                        checked={item?.Response === 3}
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
              variant="text"
              className="bg-green-500 text-white hover:bg-green-600">
              <span>Save</span>
            </Button>
            <Button
              variant="text"
              className="bg-blue-700 text-white hover:bg-blue-800">
              <span>Submit</span>
            </Button>
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

export default UnScheduleInspectionView;

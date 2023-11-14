import {
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import {
  Card,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";

export function SortableTable({ tableHeaders, tableData, optional }) {
  const [sortedData, setSortedData] = useState(tableData);
  const [sortOrder, setSortOrder] = useState(["PCL_ID", "desc"]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [pclData, setPclData] = useState("");

  const dialogOpen = (data) => {
    setPclData(
      optional.filter(
        (item) => item.PCL_ID.toLowerCase() == data.PCL_ID.toLowerCase()
      )
    );
    setOpen(!open);
  };

  useEffect(() => {}, [sortedData, sortOrder, pclData]);

  useEffect(() => {
    sortF("PCL_ID");
  }, []);

  const sortF = (head) => {
    if (
      head == "PCL_ID" ||
      head == "MeterReading" ||
      head == "OperatorContactNumber" ||
      head == "CompletedDate" ||
      head == "RO_ID"
    ) {
      if (sortOrder[0] !== head) {
        const strAscending = [...tableData].sort((a, b) => a[head] - b[head]);
        setSortedData(strAscending);
        setSortOrder([head, "asc"]);
      } else if (sortOrder[0] == head && sortOrder[1] === "asc") {
        const strDescending = [...tableData].sort((a, b) => b[head] - a[head]);
        setSortedData(strDescending);
        setSortOrder([head, "desc"]);
      } else if (sortOrder[0] == head && sortOrder[1] === "desc") {
        const strAscending = [...tableData].sort((a, b) => a[head] - b[head]);
        setSortedData(strAscending);
        setSortOrder([head, "asc"]);
      }
    } else {
      if (sortOrder[0] !== head) {
        const strAscending = [...tableData].sort((a, b) =>
          a[head] > b[head] ? 1 : -1
        );
        setSortedData(strAscending);
        setSortOrder([head, "asc"]);
      } else if (sortOrder[0] == head && sortOrder[1] === "asc") {
        const strDescending = [...tableData].sort((a, b) =>
          a[head] > b[head] ? -1 : 1
        );
        setSortedData(strDescending);
        setSortOrder([head, "desc"]);
      } else if (sortOrder[0] == head && sortOrder[1] === "desc") {
        const strAscending = [...tableData].sort((a, b) =>
          a[head] > b[head] ? 1 : -1
        );
        setSortedData(strAscending);
        setSortOrder([head, "asc"]);
      }
    }
  };

  return (
    <>
      <CardBody className="overflow-x-scroll ">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHeaders.map((head) => (
                <th
                  key={head}
                  className="cursor-pointer border-y  border-blue-gray-100  bg-blue-gray-50/50 dark:bg-gray-900/50 p-4 transition-colors hover:bg-blue-gray-50 "
                  onClick={() => sortF(head)}>
                  <Typography
                    variant="small"
                    className="flex items-center justify-between leading-none opacity-70 dark:text-white font-bold">
                    {head}
                    {sortOrder[0] != head && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                    {sortOrder[0] == head && sortOrder[1] == "asc" && (
                      <ChevronUpIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                    {sortOrder[0] == head && sortOrder[1] == "desc" && (
                      <ChevronDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((data, index) => {
              const isLast = index === sortedData.length - 1;
              const classes = isLast
                ? "p-3 "
                : "p-3 border-b border-blue-gray-50 dark:border-gray-800";

              return (
                <tr
                  key={index}
                  className="dark:bg-gray-900 even:bg-blue-gray-50/50 dark:even:bg-gray-800/50">
                  {Object.values(data).map((value, i) => (
                    <td key={i} className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-center dark:text-white">
                        {i == "0" && (
                          <Button
                            className="py-2 dark:bg-white dark:text-black"
                            onClick={() => dialogOpen(data)}
                            variant="filled">
                            {value}
                          </Button>
                        )}
                        {i == "5" && (
                          <Chip
                            icon={
                              <Avatar
                                size="xs"
                                variant="circular"
                                className="h-full w-full -translate-x-0.5 dark:text-black"
                                alt={value}
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                              />
                            }
                            value={
                              <Typography
                                variant="small"
                                className="font-medium capitalize leading-none dark:text-black">
                                {value}
                              </Typography>
                            }
                            className="rounded-full py-1.5  text-center mx-auto dark:bg-white"
                          />
                        )}

                        {i == "8" && value == "OK" && (
                          <Chip
                            className="text-center bg-green-500"
                            variant="ghost"
                            size="sm"
                            value={value}
                            // icon={
                            //   <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                            // }
                          />
                        )}
                        {i == "8" && value == "NON-CRITICAL" && (
                          <Chip
                            className="text-center  bg-yellow-700"
                            variant="ghost"
                            size="sm"
                            value={value}
                          />
                        )}
                        {i == "8" && value == "CRITICAL" && (
                          <Chip
                            className="text-center text-white bg-red-700 "
                            variant="ghost"
                            size="sm"
                            value={value}
                          />
                        )}
                        {i != "0" && i != "5" && i != "8" && value}
                      </Typography>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      {pclData && (
        <Dialog
          open={open}
          size="xl"
          handler={handleOpen}
          className="dark:bg-gray-800">
          <DialogHeader className="justify-center p-5">
            <Typography className="text-center" variant="h5" color="blue-gray">
              <span className="p-2 mr-5 bg-gray-200 rounded-lg">
                Checklist ID: {pclData[0].PCL_ID}
              </span>
              <span className="p-2 bg-gray-200 rounded-lg">
                Plant Code: {pclData[0].PlantCode}
              </span>
            </Typography>
          </DialogHeader>
          <DialogBody divider>
            <Card className="h-[70vh] w-full overflow-scroll rounded-none">
              <table className="w-full min-w-max table-auto text-start">
                <thead>
                  <tr>
                    <th
                      key="PCL CODE"
                      className="border-y border-gray-100 dark:border-gray-600  bg-blue-gray-50/50 dark:bg-gray-900  p-4">
                      <Typography
                        variant="small"
                        className="font-bold leading-none opacity-70 dark:text-white ">
                        PCL Code
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
                  {pclData[0].Checklist.map(
                    ({ PCLCode, Description, Status }, index) => {
                      const isLast = index === pclData[0].Checklist.length - 1;
                      const classes = isLast
                        ? "p-2 text-center dark:text-white"
                        : "p-2 text-center dark:text-white border-b border-blue-gray-50 dark:border-gray-800";

                      const descriptionclass = isLast
                        ? "p-2 text-left "
                        : "p-2 text-left border-b border-blue-gray-50 dark:border-gray-800";

                      return (
                        <tr
                          key={PCLCode}
                          className="dark:bg-gray-900 even:bg-blue-gray-50/50 dark:even:bg-gray-800">
                          <td className={classes}>
                            <Typography variant="small" className="font-normal">
                              {PCLCode}
                            </Typography>
                          </td>
                          <td className={classes}>
                            {Status == "OK" && (
                              <Chip
                                className="text-center text-white bg-green-500 "
                                variant="ghost"
                                size="sm"
                                value={Status}
                                // icon={
                                //   <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                // }
                              />
                            )}
                            {Status == "NON-CRITICAL" && (
                              <Chip
                                className="text-center text-white bg-yellow-700 "
                                variant="ghost"
                                size="sm"
                                value={Status}
                              />
                            )}
                            {Status == "CRITICAL" && (
                              <Chip
                                className="text-center text-white bg-red-700 "
                                variant="ghost"
                                size="sm"
                                value={Status}
                              />
                            )}
                          </td>
                          <td className={descriptionclass}>
                            <Typography
                              variant="small"
                              className="font-normal dark:text-white">
                              {Description}
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
      )}
    </>
  );
}

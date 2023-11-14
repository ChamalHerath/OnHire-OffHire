import React from "react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  BriefcaseIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  CalendarIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/solid";


import { Link, useLocation } from "react-router-dom";

const SideBarPanel = () => {
  const listClass = "focus:bg-amber-600/80 hover:bg-gray-500 ";
  const location = useLocation();

  return (
    <Card className="h-screen  p-4 pt-20 shadow-xl shadow-blue-gray-900/30 rounded-none bg-gray-100  dark:bg-gray-800">
      <List>
        <Link to="/dashboard">
          <ListItem
            key="dashboard"
            className={
              location.pathname.startsWith("/dashboard")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Dashboard</p>
          </ListItem>
        </Link>

        {/* <Link to="/checklistHistory">
          <ListItem
            key="checklistHistory"
            className={
              location.pathname.startsWith("/checklistHistory")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }
          >
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Checklist History</p>

            <ListItemSuffix> </ListItemSuffix>
          </ListItem>
        </Link> */}

        <Link to="/scheduledInspection">
          <ListItem
            key="scheduledInspection"
            className={
              location.pathname.startsWith("/scheduledInspection")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }
          >
            <ListItemPrefix>
              <CalendarDaysIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Scheduled Inspection</p>
            <ListItemSuffix> </ListItemSuffix>
          </ListItem>
        </Link>

        <Link to="/unScheduledInspection">
          <ListItem
            key="unScheduledInspection"
            className={
              location.pathname.startsWith("/unScheduledInspection")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }
          >
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Un-Scheduled</p>
            <ListItemSuffix> </ListItemSuffix>
          </ListItem>
        </Link>
        
        <Link to="/serviceHistory">
          <ListItem
            key="serviceHistory"
            className={
              location.pathname.startsWith("/serviceHistory")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }
          >
            <ListItemPrefix>
              <WrenchScrewdriverIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Service History</p>
            <ListItemSuffix> </ListItemSuffix>
          </ListItem>
        </Link>
        

        {
          // Date : 07-09-2023
          // Chris Does not want this functionality at this point
          /* <Link to="/rentalOrderHistory">
          <ListItem key="rentalOrderHistory" className={
              location.pathname.startsWith("/rentalOrderHistory")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }>
            <ListItemPrefix>
              <BriefcaseIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Rental Order History</p>

            <ListItemSuffix> </ListItemSuffix>
          </ListItem>
        </Link> */
        }

        {/* <Link to="/faultReportHistory">
          <ListItem
            key="faultReportHistory"
            className={
              location.pathname.startsWith("/faultReportHistory")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }
          >
            <ListItemPrefix>
              <ExclamationTriangleIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Fault Report History</p>
            <ListItemSuffix> </ListItemSuffix>
          </ListItem>
        </Link> */}
        {/* <Link to="/timesheets">
          <ListItem
            key="timesheets"
            className={
              location.pathname.startsWith("/timesheets")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Time Sheets</p>
            <ListItemSuffix> </ListItemSuffix>
          </ListItem>
        </Link> */}
        {
          //not needed at this moment
          /* <Link to="/settings">
          <ListItem
            key="settings"
            className={
              location.pathname.startsWith("/settings")
                ? `${listClass} bg-amber-600/80 `
                : listClass
            }
          >
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5  dark:text-white" />
            </ListItemPrefix>

            <p className=" dark:text-white">Settings</p>
            <ListItemSuffix> </ListItemSuffix>
          </ListItem>
        </Link> */
        }

        <div className="fixed right-1 bottom-0 text-center">
          <p className=" dark:text-white text-xs font-bold">
            Version - 1.001
          </p>
        </div>
      </List>
    </Card>
  );
};

export default SideBarPanel;

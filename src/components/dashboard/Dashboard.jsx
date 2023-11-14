import React, { useContext, useState } from "react";
import PreStartChart from "./PreStartChart";
import FaultReportChart from "./FaultReportChart";
// import PlantUsageChart from "./PlantUsageChart";
import TimeSheetChart from "./TimesheetChart";
import { loadingContext } from "../../context/LoadingContext";
import Loading from "../loading/loading";
import { useEffect } from "react";
import { faultReportApiData } from "../../api-client/test-data";
// import {
//   Popover,
//   PopoverHandler,
//   PopoverContent,
//   Button,
// } from "@material-tailwind/react";

// import { InformationCircleIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  const divClass =
    "h-[450px] pb-7 w-full md:w-[550px] lg:w-[650px]  bg-white/80 dark:bg-white/90  rounded-xl shadow-lg";
  const h1Class =
    "text-center p-2 border-b font-bold bg-gray-800  rounded-t-lg text-white  tracking-wide";

  const { isLoading, setIsLoading } = useContext(loadingContext);
  const [simulateLoad, setSimulateLoad] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSimulateLoad(false);
    }, 750);
  }, []);

  if (isLoading || simulateLoad) {
    return <Loading />;
  }
  return (
    <div className="pt-5 bg-no-repeat bg-cover bg-fixed  bg-gray-300 bg-blend-screen dark:bg-blend-multiply dark:bg-gray-900 bg-[url('https://www.volvoce.com/-/media/volvoce/local/training/vce_splashbackground_color.jpg')] min-h-screen">
      <div className="w-full flex flex-wrap p-5 justify-center gap-10">
        {/* <div className={divClass}>
          <h1 className={h1Class}>Pre Start Checklist</h1>
          <PreStartChart />
        </div> */}

        {/* <div className={divClass}>
          <div className="flex p-2 justify-center border-b font-bold bg-gray-800  rounded-t-lg">
           
         
            <h1 className="mr-2 text-white " >Rental Order History</h1>
            <Popover
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <PopoverHandler>
                <Button className="bg-transparent p-0">
                  <InformationCircleIcon className="w-[25px]" />
                </Button>
              </PopoverHandler>
              <PopoverContent>
                This graph illustrate plant usage only, attachment usage is omitted. 
              </PopoverContent>
            </Popover>
          </div>
          <PlantUsageChart />
        </div> */}

        {/* <div className={divClass}>
          <h1 className={h1Class}>Time Sheets</h1>
          <TimeSheetChart />
        </div> */}
        {/* <div className={divClass}>
          <h1 className={h1Class}>Fault Reports</h1>
          <img src={`data:image/jpeg;base64,${faultReportApiData[0].image1}`} />
          <FaultReportChart />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;

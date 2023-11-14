import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/MainLayout";
import NotFound from "./components/notfound/NotFound";
import Loading from "./components/loading/loading";
import Dashboard from "./components/dashboard/Dashboard";
import ChecklistHistory from "./components/checkList/ChecklistHistory";
import Schedule from "./components/inspection/Schedule";
import UnSchedule from "./components/inspection/UnSchedule";
import ServiceHistory from "./components/service/ServiceHistory";
import Login from "./components/auth/Login";

import { scheduleList } from "./api-client/scheduleList";
import { serviceHistory } from "./api-client/servicehistory";
import {
  loadingContext,
  userContext,
  themeContext,
  appDataContext,
} from "./context";

import "./App.css";
import {getImagesForCheckList, unscheduledList} from "./api-client";

function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isCheckListData, setCheckListData] = useState(false);

  const [scheduleListData, setScheduleListData] = useState(false);
  const [unScheduleListData, setUnScheduleListData] = useState(false);
  const [serviceHistoryData, setServiceHistoryData] = useState(false);
  const [checkListImages, setCheckListImages] = useState(false);
  const [singleSelectionData, setSingleSelectionData] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const getAPICalls = async () => {
    const startDate = sessionStorage.getItem("startDate");
    const endDate = sessionStorage.getItem("endDate");
    const completedDate = sessionStorage.getItem("completedDate");
    const user = JSON.parse(sessionStorage.getItem("user"));

    const scheduleListResponse = await scheduleList(
      user?.PlantCode,
      startDate,
      user?.PlantType
    );
    setScheduleListData(scheduleListResponse);

    const unScheduleListResponse = await unscheduledList(user?.PlantCode);
    setUnScheduleListData(unScheduleListResponse);

    const serviceHistoryListResponse = await serviceHistory(
      user?.PlantCode,
      completedDate,
      user?.PlantType
    );
    setServiceHistoryData(serviceHistoryListResponse);

    // const getThreeImagesResponse = await getImagesForCheckList(
    //     user?.PlantCode,
    //     completedDate,
    //     user?.PlantType
    // );
    // setCheckListImages(getThreeImagesResponse);

  };


  useEffect(() => {
    const storedData = sessionStorage.getItem("user");
    const storedDatatheme = sessionStorage.getItem("theme");

    if (storedData) {
      setUserLogged(JSON.parse(storedData));
    }
    if (storedDatatheme && JSON.parse(storedDatatheme).dark) {
      setIsDarkTheme(true);
      document.documentElement.classList.add("dark");
    }

    getAPICalls();
    setTimeout(() => {
      setAppLoading(false);
    }, 750);
  }, [userContext]);

  if (appLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter basename="/CustomerPortalApp">
      <loadingContext.Provider value={{ isLoading, setIsLoading }}>
        <userContext.Provider value={{ userLogged, setUserLogged }}>
          <appDataContext.Provider
            value={{
              isCheckListData,
              setCheckListData,
              scheduleListData,
              setScheduleListData,
              unScheduleListData,
              setUnScheduleListData,
              serviceHistoryData,
              setServiceHistoryData,
              checkListImages,
              setCheckListImages,
              singleSelectionData,
              setSingleSelectionData,
            }}>
            <themeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
              <Layout>
                <Routes>
                  <Route path="/loading" element={<Loading />} />
                  {userLogged ? (
                    <>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route
                        path="/checklistHistory"
                        element={<ChecklistHistory />}
                      />
                      <Route
                        path="/checklistHistory/:params"
                        element={<ChecklistHistory />}
                      />
                      <Route
                        path="/scheduledInspection"
                        element={<Schedule />}
                      />
                      <Route
                        path="/scheduledInspection/:params"
                        element={<Schedule />}
                      />
                      <Route
                        path="/unScheduledInspection"
                        element={<UnSchedule />}
                      />
                      <Route
                        path="/unScheduledInspection/:params"
                        element={<UnSchedule />}
                      />
                      <Route
                        path="/serviceHistory"
                        element={<ServiceHistory />}
                      />
                      <Route
                        path="/serviceHistory/:params"
                        element={<ServiceHistory />}
                      />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<Login />} />
                      <Route path="/login" element={<Login />} />
                    </>
                  )}

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </themeContext.Provider>
          </appDataContext.Provider>
        </userContext.Provider>
      </loadingContext.Provider>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import ChecklistHistory from "../components/checkList/ChecklistHistory";
import Schedule from "../components/inspection/Schedule";
import UnSchedule from "../components/inspection/UnSchedule";
import ServiceHistory from "../components/service/ServiceHistory";

const AuthenticatedRoutes = () => {
  return (
    <>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/checklistHistory" element={<ChecklistHistory />} />
      <Route path="/checklistHistory/:params" element={<ChecklistHistory />} />
      <Route path="/scheduledInspection" element={<Schedule />} />
      <Route path="/scheduledInspection/:params" element={<Schedule />} />
      <Route path="/unScheduledInspection" element={<UnSchedule />} />
      <Route path="/unScheduledInspection/:params" element={<UnSchedule />} />
      <Route path="/serviceHistory" element={<ServiceHistory />} />
        <Route path="/serviceHistory/:params" element={<ServiceHistory />} />
    </>
  );
};

export default AuthenticatedRoutes;

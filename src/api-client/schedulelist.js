import { TEST_URL } from "../config/AppConfig";
import axios from "axios";

const API_URL = TEST_URL;

const scheduleList = async (plantCode, start, type) => {
  try {
    // Search Types = PLANT / DATE / ALL
    // Login (QR Scan) according to Unique Plant and Only visualize its details
    type = "PLANT"
    const url = `${API_URL}checklist/getscheduledinspections?serarchType=${type}&plantCode=${plantCode}&startDate=`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export { scheduleList };
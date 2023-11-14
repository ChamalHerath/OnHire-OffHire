import { TEST_URL } from "../config/AppConfig";
import axios from "axios";

const API_URL = TEST_URL;


const unscheduledList = async (plantCode) => {
  try {
    const url = `${API_URL}checklist/getunscheduledinspections?plantCode=${plantCode}`;

    const response = await axios.get(url);

    return response.data;

  } catch (error) {

    return error.response; 
  }
};

export { unscheduledList };

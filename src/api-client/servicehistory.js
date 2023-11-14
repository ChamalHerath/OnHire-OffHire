import { TEST_URL } from "../config/AppConfig";
import axios from "axios";

const API_URL = TEST_URL;

const serviceHistory = async (plantCode, complete, type) => {
    try {
        // Search Types = PLANT / DATE / ALL
        // Login (QR Scan) according to Unique Plant and Only visualize its details
        type = "PLANT"
        const url = `${API_URL}checklist/getinspectionhistory?searchType=${type}&plantCode=${plantCode}&completedDate=`;
    
        const response = await axios.get(url);
    
        return response.data;

      } catch (error) {
    
        return error.response;
      }
};

export { serviceHistory };
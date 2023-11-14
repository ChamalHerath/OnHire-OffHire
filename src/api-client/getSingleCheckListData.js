import { TEST_URL } from "../config/AppConfig";
import axios from "axios";

const API_URL = TEST_URL;

const getSingleCheckListData = async (event) => {
    try {
        const url = `${API_URL}checklist/getchecklistforinspection?checklistId=${event.CL_ID}`;

        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        return error.response;
    }
};

export { getSingleCheckListData };
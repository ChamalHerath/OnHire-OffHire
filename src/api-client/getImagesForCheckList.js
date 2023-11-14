import { TEST_URL } from "../config/AppConfig";
import axios from "axios";

const API_URL = TEST_URL;

const getImagesForCheckList = async (event) => {
    try {
        const url = `${API_URL}checklist/getchecklistitemimages?checklistId=${event.checkListID}&itemCode=${event.itemCode}`;

        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        return error.response;
    }
};

export { getImagesForCheckList };
import { TEST_URL } from "../config/AppConfig";
import axios from "axios";

const API_URL = TEST_URL;

const checkList = async (customer, start, end, type, status) => {
  try {
    let customerCode = btoa(customer);
    const url = `${API_URL}CheckList/getallpclheaderbydateandtype?custCode=${customerCode}&startDate=${start}&endDate=${end}&clientType=${type}&responseType=${status}`;

    const response = await axios.get(url);

    return response;
  } catch (error) {
    return error.response;
  }
};

export { checkList };

import { TEST_URL } from "../config/AppConfig";
import axios from "axios";

const API_URL = TEST_URL;

const login = async (username, password) => {
  try {
    // Search Types = PLANT / DATE / ALL
    // Login (QR Scan) according to Unique Plant and Only visualize its details
    let encodedpassword = btoa(password);
    let encodedusername = btoa(username);
    const url = `${API_URL}Login/login?userName=${encodedusername}&password=${encodedpassword}`;
    const response = await axios.get(url);

    return response;
  } catch (error) {
    return error.response;
  }
};

export { login };

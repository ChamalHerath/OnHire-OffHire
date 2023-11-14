const LIVE_URL = "https://opasapi.vrentsapp.com.au/api/";
const TEST_URL = "https://nexgensmart.com.au/VRentsTestTSAPI/api/";
//import config from "/public/Configs.json"

const ENV = 0// 0 = dev, 1 = test, 2 = live
const VERSION = "2.4.7"

let API_URL = TEST_URL
if (ENV === 2) {
    API_URL = LIVE_URL
}

const CONFIGS = config

const LIST_HEIGHT = "max-h-[calc(100vh-280px)]"




export { API_URL, ENV, CONFIGS, VERSION, LIST_HEIGHT };













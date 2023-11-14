//Common place to API call function

//import API URL
import { API_URL } from './Config';
import { isEmpty } from './GeneralFunctions';

const messageLevels = [
    "ERROR",
    "EXCEPTION",
    "CONCURRENT",
]

function encodeUrl(url) {
    let finalUrl = "";
    //If this url doesnt include parameters just return it as is
    if (!url.includes("=")) {
        return API_URL + url;
    } else if (url.includes("undefined")) {//Dont sent urls with unknown params
        return "";
    }

    url = url.split("=");//Split into [action/param1, val1&param2, val2]

    for (let i in url) {
        //If this item includes a value
        if (url[i].includes("&")) {//There is another param, hence this was the value for the previous param
            url[i] = url[i].split("&");

            //Add the current encoded value and the next param
            url[i] = `${encodeURIComponent(url[i][0])}&${url[i][1]}`;
        } else if (Number(i) === url.length - 1) {//There was a param and this is the end of the url so this must be a value
            url[i] = `${encodeURIComponent(url[i])}`;
        }

        finalUrl += `${url[i]}=`;
    }

    finalUrl = API_URL + finalUrl.substring(0, finalUrl.length - 1);//Remove the trailing '='
    return finalUrl;
}

function returnToLogin() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.setItem("page", "dashboard");
    window.open("/", "_self");
}


async function apiGetCall(url, callback, error, isList) {
    const token = JSON.parse(sessionStorage.getItem("token"))


    let bearer = null
    if (token) {
        bearer = 'Bearer ' + token.token;
    } else {
        return
    }
    url = encodeUrl(url);

    if (isEmpty(url)) { return; }

    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': bearer,
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            returnToLogin();
        } else {
            if (!error) {
                console.error("500")
                return
            }
            return error("500, Backend error")
        }
    }).then(data => {
        if (data) {
            if (data.StatusMessage && data.StatusMessage !== null && messageLevels.includes(data.StatusMessage.MessageLevel)) {
                if (!error) {
                    console.error(data.StatusMessage)
                    return
                }
                return error(data.StatusMessage);
            } else {
                if (isList) {
                    data = data.DataList;
                }

                return callback(data);
            }
        }
    }).catch(e => {
        if (!error) {
            console.error(e)
            return
        }
        return error("Device Offline")
    });
}


function apiPostCall(url, method, body, callback, error) {
    const bearer = 'Bearer ' + JSON.parse(sessionStorage.getItem("token")).token;
    url = encodeUrl(url);

    if (isEmpty(url)) { return; }

    fetch(url, {
        method: method,
        body: body,
        headers: {
            'Authorization': bearer,
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            returnToLogin();
        } else {
            response.text().then((data) => {
                if (data[0] === "{") {
                    //If this is an error object
                    data = JSON.parse(data);
                    if (!error) {
                        console.error(data.errMsg)
                        return
                    }
                    return error(data.errMsg); //Just pass the error msg
                } else {
                    if (!error) {
                        console.error(data)
                        return
                    }
                    return error(data);
                }
            });
        }
    }).then(data => {
        if (data) {
            //Is there and error the front end should report?
            if (data.MessageLevel && messageLevels.includes(data.MessageLevel)) {
                if (!error) {
                    console.error(data)
                    return
                }
                return error(data);
            }
            else if (data.StatusMessage && data.StatusMessage !== null && messageLevels.includes(data.StatusMessage.MessageLevel)) {
                if (!error) {
                    console.error(data.StatusMessage)
                    return
                }
                return error(data.StatusMessage);
            } else {
                return callback(data);
            }
        }
    }).catch(e => {
        if (e.message.includes("Failed to fetch")) {
            if (!error) {
                console.error("Device Offline")
                return
            }
            return error("Device Offline")
        }
    });
}

//API call with any method but without a body
function apiOtherCall(url, method, callback, error) {
    const bearer = 'Bearer ' + JSON.parse(sessionStorage.getItem("token")).token;
    url = encodeUrl(url);

    if (isEmpty(url)) { return; }

    fetch(url, {
        method: method,
        headers: {
            'Authorization': bearer,
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            returnToLogin();
        } else {
            if (!error) {
                console.error("500")
                return
            }
            return error("500, Backend error")
        }
    }).then(data => {
        if (data) {
            //Is there and error the front end should report?
            if (data.MessageLevel && messageLevels.includes(data.MessageLevel)) {
                if (!error) {
                    console.error(data)
                    return
                }
                return error(data);
            }
            else if (data.StatusMessage && data.StatusMessage !== null && messageLevels.includes(data.StatusMessage.MessageLevel)) {
                if (!error) {
                    console.error(data.StatusMessage)
                    return
                }
                return error(data.StatusMessage);
            } else {
                if (!error) {
                    console.error(data)
                    return
                }
                return callback(data);
            }
        }
    });
}

function apiLoginCall(url, user, pass, method, callback, error) {
    url = encodeUrl(url);


    if (isEmpty(url)) { return; }

    fetch(url, {
        method: method,
        headers: new Headers({
            'Authorization': 'Basic ' + btoa(`${user}:${pass}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 401) {
            if (!error) {
                console.error("Username or Password is incorrect")
                return
            }
            return error("Username or Password is incorrect");
        } else {
            if (!error) {
                console.error("500")
                return
            }
            return error("500, Backend error")
        }
    }).then(data => {
        if (data) {
            //Is there and error the front end should report?
            if (data.MessageLevel && messageLevels.includes(data.MessageLevel)) {
                if (!error) {
                    console.error(data)
                    return
                }
                return error(data);
            }
            else if (data.StatusMessage && data.StatusMessage !== null && messageLevels.includes(data.StatusMessage.MessageLevel)) {
                if (!error) {
                    console.error(data.StatusMessage)
                    return
                }
                return error(data.StatusMessage);
            } else {
                return callback(data);
            }
        }
    });
}

/*Search through a list of API values. 
 * 
 *   if(newList.newDataCheckField === oldData.oldField){
 *      Replace data.oldField with newList.replaceField
 *   }
 *   
 *   
 *   oldData = array of data to be replaced
 *   newDataCheckField = the name of the field that has the same value as the oldData
 *   oldField = the name of the field with the oldData
 *   replaceField = the name of the field the new data should come from
 *   callback(changedData)
 */
function replaceData(url, oldData, newDataCheckField, oldField, replaceField) {
    return new Promise(res => {
        url = encodeUrl(url);

        const callback = newData => {

            for (let i in oldData) {
                for (let j in newData) {
                    if (newData[j][newDataCheckField] === oldData[i][oldField]) {
                        oldData[i][oldField] = newData[j][replaceField];
                        break;
                    }
                }
            }

            res(oldData);
        }

        apiGetCall(url, callback, () => { }, true);
    });
}

export {
    apiGetCall,
    apiPostCall,
    apiOtherCall,
    apiLoginCall,
    replaceData
}
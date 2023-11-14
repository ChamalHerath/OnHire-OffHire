import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { apiGetCall } from '../APIFunctions';
import { getSubValue } from '../GeneralFunctions';



export default function PeerTable2(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        if (props.url) {
            GETdata()
        } else {
            formatFromAPI(props.data)
        }
    }, [props.bump, props.url, props.data])

    function formatFromAPI(newData) {
        for (let i in newData) {
            //Store the id coming from the backend in the rowId column
            if (newData[i].id) {
                newData[i].rowId = newData[i].id
            }
            newData[i].id = i

          
            for (let field in newData[i]) {
                if (typeof newData[i][field] === "object" && !Array.isArray(newData[i][field])) {
                    for (let key in newData[i][field]) {
                        newData[i][key] = newData[i][field][key]
                    }
                }
            }
        }

        setData(newData)
    }

    function GETdata() {
        setData([])
        const url = props.url

        const callback = da => {
            if (props.dataKey) {
                da = getSubValue(da, props.dataKey)
            }

            formatFromAPI(da)
            if (props.onReturn) {
                props.onReturn(da)
            }
        }

        const error = e => {
            console.error(e)
        }

        apiGetCall(url, callback, error)
    }


    return (
        <DataGrid
            className='text-white'
            autoHeight
            rows={data}
            pageSize={!props.pageSize ? 5 : ""}
            {...props}
            sx={{
                '.MuiTablePagination-toolbar': {
                    color: "white"
                }
            }}
        />
    );
}

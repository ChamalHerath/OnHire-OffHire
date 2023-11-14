import Box from "@mui/material/Box";
import React, { useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { themeContext } from "../context/ThemeContext";

const NexGenTable = ({ columns, rows, getRowId, height }) => {
  const { isDarkTheme, setIsDarkTheme } = useContext(themeContext);

  return (
    <Box className="mt-5  overflow-x-auto w-full">
      <DataGrid
        autoHeight
        getRowHeight={height}
        getRowId={getRowId}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-sortIcon": {
            color: isDarkTheme ? "white" : "black",
          },
          "& .MuiDataGrid-columnHeader": {
            color: isDarkTheme ? "white" : "black",
          },
          "& .MuiDataGrid-menuIconButton": {
            color: isDarkTheme ? "white" : "black",
          },
          "& .MuiDataGrid-rowCount": {
            color: isDarkTheme ? "white" : "black",
          },
          "& .MuiTablePagination-displayedRows": {
            color: isDarkTheme ? "white" : "black",
          },
          "& .MuiTablePagination-actions": {
            color: isDarkTheme ? "white" : "black",
          },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0
            ? "bg-white dark:bg-gray-800/50"
            : "bg-gray-400 dark:bg-gray-900"
        }
      />
    </Box>
  );
};

export default NexGenTable;

const headerClass = "dark:text-black bg-gray-300 dark:bg-gray-700/80";

export const SCHEDULE_LIST_COLUMNS = [
  {
    field: "CL_ID",
    headerName: "Checklist ID",
    headerClassName: headerClass,
    headerAlign: "center",
    flex: 120,
    minWidth: 120,
    renderCell: (params) => {
      return (
        <Button
          title="Open Checklist"
          className="py-3 w-[120px] dark:bg-white text-black text-center mx-auto bg-[#FDC031]"
          onClick={setOpen}
          variant="filled">
          {params.value}
        </Button>
      );
    },
  },
  {
    field: "RO_ID",
    headerName: "Rental Order ID",
    headerClassName: headerClass,
    headerAlign: "center",
    type: "number",
    renderCell: (params) => (
      <p className=" dark:text-white text-center mx-auto">{params.value}</p>
    ),
    flex: 120,
    minWidth: 120,
  },
  {
    field: "MeterReading",
    headerName: "Meter Reading",
    headerClassName: headerClass,
    headerAlign: "center",
    renderCell: (params) => (
      <p className="dark:text-white text-center mx-auto group-hover:text-red-500">
        {params.value}
      </p>
    ),
    flex: 160,
    minWidth: 160,
  },
  {
    field: "DueDate",
    headerName: "Due Date",
    headerClassName: headerClass,
    headerAlign: "center",
    renderCell: (params) => (
      <p className=" dark:text-white text-center mx-auto">{params.value}</p>
    ),
    flex: 160,
    minWidth: 160,
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 135,
    minWidth: 135,
    headerClassName: headerClass,
    headerAlign: "center",
    renderCell: (params) => (
      <div className="text-center mx-auto">
        {console.log("params", params)}
        {params.value == "1" && (
          <Chip
            className="text-center text-white bg-green-500 w-[120px] py-2"
            variant="ghost"
            size="sm"
            value="ON"
          />
        )}
        {params.value == "2" && (
          <Chip
            className="text-center text-white bg-red-700 w-[120px] py-2"
            variant="ghost"
            size="sm"
            value="OFF"
          />
        )}
      </div>
    ),
  },
];

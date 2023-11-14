import React, { useContext } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Card, Typography, Chip } from "@material-tailwind/react";
import { appDataContext } from "../../context/AppData";

const PlantUsageChart = () => {
  const { isROHData, setROHData } = useContext(appDataContext);
  const counts = {};

  if (!isROHData || isROHData.length === 0) {
    return (
      <div>
        <p>No data available.</p>
      </div>
    );
  }

  isROHData.forEach((item) => {
    const serviceGroup = item.catalogCode;
    const equipCode = item.equipmentCode;

    if (!counts[serviceGroup]) {
      counts[serviceGroup] = { serviceGroup, total: 0 };
    }

    if (!counts[serviceGroup][equipCode]) {
      counts[serviceGroup][equipCode] = 0;
    }

    counts[serviceGroup][equipCode]++;
    counts[serviceGroup].total++;
  });

  const printing = Object.values(counts);

  const findDataByIndexValue = (indexValue) => {
    return printing.find((item) => item.serviceGroup === indexValue);
  };
  // if(isROHData){
  //   return <div>{console.log(printing)}</div>;
  // }
  return (
    <ResponsiveBar
      data={printing}
      keys={["total"]}
      indexBy="serviceGroup"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.2}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colorBy={(e) => e.indexValue}
      colors={{ scheme: "nivo" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legend: "Service Groups",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Plant Usage",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      role="application"
      ariaLabel="Plant Usage Chart"
      tooltip={(data) => {
        const tooltipData = findDataByIndexValue(data.indexValue);

        return (
          <div className="bg-white p-4 rounded-md shadow-md">
            {tooltipData && (
              <>
                {Object.keys(tooltipData)
                  .filter((key) => key !== "serviceGroup")
                  .map((key) => (
                    <div key={key}>
                      <span className="font-bold capitalize"> {key}</span>:{" "}
                      <span className="">{tooltipData[key]}</span>
                    </div>
                  ))}
              </>
            )}
          </div>
        );
      }}
      barAriaLabel={(e) => e.id + ": " + e.formattedValue}
    />
  );
};

export default PlantUsageChart;

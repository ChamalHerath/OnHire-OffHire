import React from "react";

import { ResponsivePie } from "@nivo/pie";
import { Card, Typography, Chip } from "@material-tailwind/react";
import { appDataContext } from "../../context/AppData";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const PreStartChart = () => {
  const { isCheckListData, setCheckListData } =
    useContext(appDataContext);
    const navigate = useNavigate();

  if (!isCheckListData || isCheckListData.length === 0) {
    return (
      <div>
        <p>No data available.</p>
        
      </div>
    );
  }
  const colorsForPieChart = [
    {
      id: "NCT",
      color: "#f1e15b",
    },
    {
      id: "CT",
      color: "#f47560",
    },
    {
      id: "OK",
      color: "#8fb935",
    },
  ];

  const countObject = isCheckListData.reduce((counts, item) => {
    counts[item.response] = (counts[item.response] || 0) + 1;
    return counts;
  }, {});

  const countArray = Object.entries(countObject).map(([response, count]) => {
    const colorItem = colorsForPieChart.find((item) => item.id === response);
    const color = colorItem ? colorItem.color : "#000";

    return {
      id: response,
      value: count,
      color,
    };
  });

  return (
    <ResponsivePie
      data={countArray}
      colors={{ datum: "data.color" }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={10}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={5}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 35,
          itemWidth: 60,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
      onClick={(node)=>{navigate(`/checklistHistory/${node.id}`);}}
    />
  );
};

export default PreStartChart;

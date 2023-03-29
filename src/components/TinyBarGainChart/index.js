import "./style.scss";
import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "04/2022",
    amt: 80,
  },
  {
    name: "05/2022",
    amt: 36,
  },
  {
    name: "06/2022",
    amt: 72,
  },
  {
    name: "07/2022",
    amt: 44,
  },
  {
    name: "08/2022",
    amt: 80,
  },
  {
    name: "09/2022",
    amt: 96,
  },
  {
    name: "10/2022",
    amt: 12,
  },
  {
    name: "11/2022",
    amt: 36,
  },
  {
    name: "12/2022",
    amt: 72,
  },
  {
    name: "01/2023",
    amt: 44,
  },
  {
    name: "02/2023",
    amt: 80,
  },
  {
    name: "03/2023",
    amt: 96,
  },
];

export default function TinyBarGainChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];
  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div>
      <ResponsiveContainer width="100%" height={100} >
        <BarChart data={data}>
          <Bar dataKey="amt" onClick={handleClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#1B9D67" : "#7AD9B1"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <span className="content">{`${activeItem.name}: ${activeItem.amt}`}</span>
    </div>
  );
}

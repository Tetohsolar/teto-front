import "./style.scss";
import React from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 800,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 2000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2400,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2000,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 2400,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 800,
    pv: 3800,
    amt: 2500,
  },
];

export default function TinyBarGainChart(props) {
  return (
    <ResponsiveContainer width="100%" height={100} >
      <BarChart data={data}>
        <Bar dataKey="uv" fill={props.barChartFill} />
      </BarChart>
    </ResponsiveContainer>
  );
}
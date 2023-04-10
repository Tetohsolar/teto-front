import "./style.scss";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "out",
    amt: 12,
  },
  {
    name: "nov",
    amt: 36,
  },
  {
    name: "dez",
    amt: 72,
  },
  {
    name: "jan",
    amt: 44,
  },
  {
    name: "fev",
    amt: 80,
  },
  {
    name: "mar",
    amt: 96,
  },
];

export default function AnnualVariationChart(props) {
  return (
    <div style={{ width: "100%", height: 256 }}>
      <p>Número de propostas</p>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amt"
            stroke={props.strokeColor}
            fill={props.fillColor}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

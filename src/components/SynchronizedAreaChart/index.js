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


export default function SynchronizedAreaChart(props) {
  return (
    <div style={{ width: "100%", height: 256 }}>
      <p>Número de propostas</p>
      <ResponsiveContainer>
        <AreaChart
          data={props.data}
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

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";
import "./style.scss";

const data = [
  {
    name: "1",
    inversor: 2600,
    microinversor: 2500,
    consumo: 2600,
  },
  {
    name: "2",
    inversor: 2500,
    microinversor: 2700,
    consumo: 2600,
  },
  {
    name: "3",
    inversor: 2600,
    microinversor: 2800,
    consumo: 2600,
  },
  {
    name: "4",
    inversor: 2500,
    microinversor: 2600,
    consumo: 2600,
  },
  {
    name: "5",
    inversor: 2700,
    microinversor: 2500,
    consumo: 2600,
  },
  {
    name: "6",
    inversor: 2700,
    microinversor: 2600,
    consumo: 2600,
  },
  {
    name: "7",
    inversor: 2600,
    microinversor: 2700,
    consumo: 2600,
  },
  {
    name: "8",
    inversor: 2800,
    microinversor: 2900,
    consumo: 2600,
  },
  {
    name: "9",
    inversor: 2900,
    microinversor: 2700,
    consumo: 2600,
  },
  {
    name: "10",
    inversor: 3000,
    microinversor: 2900,
    consumo: 2600,
  },
  {
    name: "11",
    inversor: 2100,
    microinversor: 2200,
    consumo: 2600,
  },
  {
    name: "12",
    inversor: 3000,
    microinversor: 3100,
    consumo: 2600,
  },
];

export default function AnnualVariationChart(props) {
  return (
    <div
      className="annual-variation-chart annual-variation"
      style={{ height: 256 }}
    >
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="inversor" fill="#F2811D" />
          <Bar dataKey="microinversor" fill="#2182BF" />
          <Line type="monotone" dataKey="consumo" stroke="#21BF7D" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

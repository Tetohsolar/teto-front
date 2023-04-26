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
          data={props.data}
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
        
          <Line type="monotone" dataKey="consumo" stroke="#21BF7D" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

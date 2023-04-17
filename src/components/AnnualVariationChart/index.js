import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line, } from 'recharts';
import './style.scss'

const data = [
  {
    name: 'Page A',
    inversor: 4000,
    microinversor: 2400,
    consumo: 2400,
  },
  {
    name: 'Page B',
    inversor: 3000,
    microinversor: 1398,
    consumo: 2210,
  },
  {
    name: 'Page C',
    inversor: 2000,
    microinversor: 9800,
    consumo: 2290,
  },
  {
    name: 'Page D',
    inversor: 2780,
    microinversor: 3908,
    consumo: 2000,
  },
  {
    name: 'Page E',
    inversor: 1890,
    microinversor: 4800,
    consumo: 2181,
  },
  {
    name: 'Page F',
    inversor: 2390,
    microinversor: 3800,
    consumo: 2500,
  },
  {
    name: 'Page G',
    inversor: 3490,
    microinversor: 4300,
    consumo: 2100,
  },
];

export default function AnnualVariationChart(props) {
  return (
    <div className='annual-variation-chart annual-variation' style={{height: 256 }}>
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

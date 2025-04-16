"use client";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip,} from "recharts";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }: {
//   cx: number;
//   cy: number;
//   midAngle: number;
//   innerRadius: number;
//   outerRadius: number;
//   percent: number;
//   index: number;
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {/* {`${(percent * 100).toFixed(0)}%`} */}
//     </text>
//   );
// };

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Lấy dữ liệu của phần được hover
      return (
        <div className="bg-white p-2 rounded shadow-md">
          <p className="text-gray-500 font-semibold">{`${data.name}: ${data.players}`}</p>
        </div>
      );
    }
    return null;
  };

  export default function PieChartComponent ({data}: {data: any[]})  {
  return (
    <div className="bg-gray-100 rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Team Distribution</h1>
      </div>
      {/* CHART */}
      <div className="flex items-center">
        <ResponsiveContainer width="100%" height={600}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={renderCustomizedLabel}
              outerRadius={200}
              fill="#8884d8"
              dataKey="players"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="square"
                wrapperStyle={{ fontSize: "20px", }}
              />
              <Tooltip content={<CustomTooltip/>}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

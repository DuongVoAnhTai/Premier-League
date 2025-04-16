"use client"

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const legendFormatter = (value: string) => {
  if (value === "total") {
    return "Player By Age Group";
  }
  return value;
};

export default function BarChartComponent({data}: {data: any[]}) {
  return (
    <div className='bg-gray-100 rounded-xl w-full h-full p-4'>
        {/* TITLE */}
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Player Age Distribution</h1>
        </div>
        {/* CHART */}
        <ResponsiveContainer width="100%" height="90%">
            <BarChart
              width={500}
              height={300}
              data={data.length > 0 ? data : [{ name: "Loading...", total: 0 }]}
              margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis 
                  />
                <Tooltip />
                <Bar dataKey="total" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                <Legend 
                  align="center"
                  verticalAlign="top"
                  iconType="square"
                  wrapperStyle={{ fontSize: "20px", paddingTop: "20px", paddingBottom: "30px"}}
                  formatter={legendFormatter}
                />
            </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

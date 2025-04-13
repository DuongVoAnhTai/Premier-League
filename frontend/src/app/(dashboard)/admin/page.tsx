// "use client";

import BarChart from "@/components/BarChart"
import PieChartComponent from "@/components/PieChart"
import UserCard from "@/components/UserCard"

// import Link from "next/link";

// export default function AdminDashboard() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Link href="/admin/tournaments" className="bg-blue-600 text-white p-4 rounded text-center">
//           Manage Tournaments
//         </Link>
//         <Link href="/admin/teams" className="bg-blue-600 text-white p-4 rounded text-center">
//           Manage Teams
//         </Link>
//         <Link href="/admin/players" className="bg-blue-600 text-white p-4 rounded text-center">
//           Manage Players
//         </Link>
//         <Link href="/admin/schedules" className="bg-blue-600 text-white p-4 rounded text-center">
//           Manage Schedules
//         </Link>
//         <Link href="/admin/matches" className="bg-blue-600 text-white p-4 rounded text-center">
//           Manage Matches
//         </Link>
//         <Link href="/admin/results" className="bg-blue-600 text-white p-4 rounded text-center">
//           Manage Results
//         </Link>
//       </div>
//     </div>
//   );
// }


export default function AdminPage () {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="total tournament"/>
          <UserCard type="active team"/>
          <UserCard type="scheduled matches"/>
          <UserCard type="total player"/>
        </div>
        {/* CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* PIE CHARTS */}
          <div className="w-full lg:w-1/2 h-[700px]">
            <PieChartComponent/>
          </div>
            {/* BAR CHARTS */}
          <div className="w-full lg:w-1/2 h-[600px]">
            <BarChart/>
          </div>
        </div>
      </div>
    </div>
  )
}





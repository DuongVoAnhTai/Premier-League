// "use client";

import Image from "next/image"

// import { useAuthContext } from "@/context/AuthContext";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const Navbar: React.FC = () => {
//   const { isAuthenticated, logout } = useAuthContext();
//   const router = useRouter();

//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };

//   return (
//     <nav className="bg-blue-600 p-4 text-white">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-2xl font-bold">
//           Football Championship
//         </Link>
//         <div className="space-x-4">
//           <Link href="/tournaments" className="hover:underline">
//             Tournaments
//           </Link>
//           <Link href="/teams" className="hover:underline">
//             Teams
//           </Link>
//           <Link href="/players" className="hover:underline">
//             Players
//           </Link>
//           <Link href="/schedules" className="hover:underline">
//             Schedules
//           </Link>
//           <Link href="/matches" className="hover:underline">
//             Matches
//           </Link>
//           <Link href="/rankings" className="hover:underline">
//             Rankings
//           </Link>
//           {isAuthenticated && (
//             <>
//               <Link href="/admin" className="hover:underline">
//                 Admin Dashboard
//               </Link>
//               <button onClick={handleLogout} className="hover:underline">
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


export default function Navbar () {
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex">
        <label htmlFor="">Admin</label>
      </div>
      {/* ICONS AND USERS */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="flex cursor-pointer">
          <span className="text-xs leading-3 font-medium">Admin</span>
        </div>
        <Image src="/avatar.png" alt="" width={20} height={20}/>
      </div>
    </div>
  )
}
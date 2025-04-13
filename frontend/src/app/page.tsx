// "use client";

// import { useAuthContext } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const { login } = useAuthContext();
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const username = formData.get("username") as string;
//     const password = formData.get("password") as string;

//     try {
//       await login(username, password);
//       router.push("/tournaments");
//     } catch (error) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-4">Login</h1>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block">Username</label>
//             <input type="text" name="username" className="border p-2 w-full" required />
//           </div>
//           <div>
//             <label className="block">Password</label>
//             <input type="password" name="password" className="border p-2 w-full" required />
//           </div>
//           <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}

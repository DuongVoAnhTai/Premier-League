"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
    {
        id: "main",
        items: [
            {
                icon: "/dashboard.png",
                label: "Dashboard",
                href: "/admin/dashboard",
            },
            {
                icon: "/tournament.png",
                label: "Tournaments",
                href: "/admin/tournaments",
            },
            {
                icon: "/team.png",
                label: "Teams",
                href: "/admin/teams",
            },
            {
                icon: "/player.png",
                label: "Players",
                href: "/admin/players",
            },
            {
                icon: "/match.png",
                label: "Matches",
                href: "/admin/matches",
            },
            {
                icon: "/goal.png",
                label: "Results",
                href: "/admin/goals",
            },
            {
                icon: "/ranking.png",
                label: "Ranking",
                href: "/admin/standings",
            },
            {
                icon: "/player.png",
                label: "Users",
                href: "/admin/users",
            },
        ]
    },
    {
        id: "secondary",
        items:[
            // {
            //     icon: "/profile.png",
            //     label: "Profile",
            //     href: "/profile", 
            // },
            {
                icon: "/logout.png",
                label: "Logout",
                href: "/", 
            }
        ]
    }
]

export default function Menu () {
    const pathname = usePathname();
    const [activePath, setActivePath] = useState("");

    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);
    
    return (
        <div className="mt-4 text-sm p-2">
            {menuItems.map(i => (
                <div className="flex flex-col gap-2 p-2" key={i.id}>
                    {i.items.map(item => (
                        <Link href={item.href} key={item.label}>
                            <div
                                className={`flex items-center justify-center lg:justify-start gap-4 text-gray-300 p-2 mt-4
                                    hover:bg-blue-300 hover:text-white hover:rounded-lg
                                    transition-all duration-300
                                    ${activePath === item.href ? "bg-blue-300 text-white rounded-lg" : ""}`}>

                                <Image src={item.icon} alt="" width={20} height={20}/>
                                <span className="hidden lg:block">{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}
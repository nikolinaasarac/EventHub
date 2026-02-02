"use client"

import * as React from "react"
import Link from "next/link"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Button} from "@/components/ui/button"
import {useAuth} from "@/context/auth-context";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {LogOut, UserIcon} from "lucide-react";

export function NavBar() {
	const {user, logout} = useAuth();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
			<div className="container mx-auto flex h-16 items-center justify-between">

				<div className="flex items-center gap-8">
					<Link href="/home" className="font-bold text-xl text-indigo-600">
						<img src="/logo2-1.png" alt="Logo" className="h-30 w-auto z-20"/>
					</Link>

					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link href="/home">Početna</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link href="/events">Događaji</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link href="/calendar">Kalendar događaja</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link href="/news">Novosti</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink
									asChild
									className={navigationMenuTriggerStyle()}
								>
									<Link href="/locations">Lokacije</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="flex items-center gap-4">
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="!h-8 !w-8 rounded-full bg-indigo-600 hover:bg-indigo-700" >
									<UserIcon className="!h-7 !w-7 text-white"/>
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end" className="w-40">
								<DropdownMenuItem asChild>
									<Link href="/profile">
										Moj profil
									</Link>
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={logout}
									className="text-red-600 focus:text-red-600"
								>
									<LogOut className="mr-2 h-4 w-4"/>
									Odjavi se
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<>
							<Button variant="ghost" asChild>
								<Link href="/login">Prijavi se</Link>
							</Button>
							<Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
								<Link href="/signup">Kreiraj nalog</Link>
							</Button>
						</>
					)}
				</div>

			</div>
		</header>
	)
}
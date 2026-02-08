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
import {LogIn, LogOut, MenuIcon, UserIcon, UserPlus} from "lucide-react";

export function NavBar() {
	const {user, logout} = useAuth();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
			<div className="flex h-16 items-center justify-between mx-5">

				<div className="flex items-center gap-8">
					<Link href="/home" className="font-bold text-xl text-indigo-600">
						<img src="/logo2-1.png" alt="Logo" className="h-12 w-auto z-20"/>
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
									<Link href="/calendar">Kalendar</Link>
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
					<NavigationMenu className="md:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="!h-8 !w-8 bg-white hover:bg-gray-100">
									<MenuIcon className="!h-7 !w-7 text-black"/>
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end" className="w-40">
								<DropdownMenuItem asChild>
									<Link href="/home">
										Početna
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/events">
										Događaji
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/calendar">
										Kalendar događaja
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/locations">
										Lokacije
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/login">
										<LogIn className="mr-2 h-4 w-4"/>
										Prijavi se
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/signup">
										<UserPlus className="mr-2 h-4 w-4"/>
										Kreiraj nalog
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</NavigationMenu>
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="!h-8 !w-8 rounded-full bg-indigo-600 hover:bg-indigo-700">
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
						<div className="hidden md:flex">
							<Button variant="ghost" asChild>
								<Link href="/login">Prijavi se</Link>
							</Button>
							<Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
								<Link href="/signup">Kreiraj nalog</Link>
							</Button>
						</div>
					)}
				</div>

			</div>
		</header>
	)
}
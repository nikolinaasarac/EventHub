"use client"

import * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Button} from "@/components/ui/button"
import {useAuth} from "@/context/auth-context"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
	LogIn, LogOut, MenuIcon, UserPlus,
	LayoutDashboard, Users2, CalendarDays, MapPin,
	Ticket, Heart, HomeIcon,
} from "lucide-react"
import {UserRole} from "@/shared/enums/user-role.enum"
import {cn} from "@/lib/utils"

export function NavBar() {
	const {user, logout} = useAuth();
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	const mainLinks = [
		{ href: "/home", label: "Početna", icon: <HomeIcon className="w-4 h-4" /> },
		{ href: "/events", label: "Događaji", icon: <Ticket className="w-4 h-4" /> },
		{ href: "/calendar", label: "Kalendar", icon: <CalendarDays className="w-4 h-4" /> },
		{ href: "/locations", label: "Lokacije", icon: <MapPin className="w-4 h-4" /> },
	];

	return (
		<header
			className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
			<div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">

				<div className="flex items-center gap-10">
					<Link href="/home" className="transition-transform hover:scale-105 active:scale-95">
						<img src="/logo2-1.png" alt="Logo" className="h-10 md:h-12 w-auto"/>
					</Link>

					<NavigationMenu className="hidden lg:flex">
						<NavigationMenuList className="gap-2">
							{mainLinks.map((link) => (
								<NavigationMenuItem key={link.href}>
									<NavigationMenuLink asChild
														className={cn(
															navigationMenuTriggerStyle(),
															"h-10 px-4 text-sm font-bold uppercase tracking-wider transition-all",
															isActive(link.href)
																? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600 rounded-none"
																: "bg-transparent text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50"
														)}
									>
										<Link href={link.href}>
											<div className="flex items-center gap-2">
												{link.icon}
												<span>{link.label}</span>
											</div>
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="flex items-center gap-3">

					<div className="lg:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200">
									<MenuIcon className="h-6 w-6 text-slate-700" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-[280px] p-2 rounded-[1.5rem] shadow-2xl border-slate-100">
								<DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-2">Navigacija</DropdownMenuLabel>

								{mainLinks.map((link) => (
									<DropdownMenuItem key={link.href} asChild className="rounded-xl py-3 cursor-pointer">
										<Link href={link.href} className="flex items-center gap-3 font-bold text-slate-700">
											<div className="text-indigo-600">{link.icon}</div> {link.label}
										</Link>
									</DropdownMenuItem>
								))}

								<DropdownMenuSeparator className="my-2" />

								{!user ? (
									<div className="flex flex-col gap-2 p-1">
										<Button variant="outline" asChild className="w-full rounded-xl border-slate-200 font-bold h-11 justify-start gap-3">
											<Link href="/login"><LogIn className="w-4 h-4 text-indigo-600" /> Prijavi se</Link>
										</Button>
										<Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold h-11 justify-start gap-3">
											<Link href="/signup"><UserPlus className="w-4 h-4" /> Kreiraj nalog</Link>
										</Button>
									</div>
								) : (
									<>
										<DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-2">Upravljanje</DropdownMenuLabel>
										{user.roles.some(role => role.name === UserRole.ORGANIZER) && (
											<DropdownMenuItem asChild className="rounded-xl py-3 text-indigo-600 font-bold">
												<Link href="/statistics" className="flex items-center gap-3"><LayoutDashboard className="w-4 h-4" /> Statistika</Link>
											</DropdownMenuItem>
										)}
										{user.roles.some(role => role.name === UserRole.ADMIN) && (
											<DropdownMenuItem asChild className="rounded-xl py-3 text-indigo-600 font-bold">
												<Link href="/users" className="flex items-center gap-3"><Users2 className="w-4 h-4" /> Korisnici</Link>
											</DropdownMenuItem>
										)}
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{user ? (
						<div className="flex items-center gap-4">
							<div className="hidden lg:flex items-center gap-2 pr-2 border-r border-slate-200">
								{user.roles.some(role => role.name === UserRole.ORGANIZER) && (
									<Button variant="ghost" asChild
											className="text-indigo-600 font-bold h-9 gap-2 rounded-xl hover:bg-indigo-50">
										<Link href="/statistics"><LayoutDashboard
											className="w-4 h-4"/> Statistika</Link>
									</Button>
								)}
								{user.roles.some(role => role.name === UserRole.ADMIN) && (
									<Button variant="ghost" asChild
											className="text-indigo-600 font-bold h-9 gap-2 rounded-xl hover:bg-indigo-50">
										<Link href="/users"><Users2 className="w-4 h-4"/> Korisnici</Link>
									</Button>
								)}
							</div>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-indigo-900 p-0 overflow-hidden ring-2 ring-indigo-600 ring-offset-2 transition-transform active:scale-90">
										<div
											className="flex h-full w-full items-center justify-center text-white font-bold">
											{user.email.charAt(0).toUpperCase()}
										</div>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end"
													 className="w-64 p-2 rounded-2xl shadow-2xl border-slate-100">
									<DropdownMenuLabel className="px-3 py-4">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-bold text-slate-900">Moj nalog</p>
											<p className="text-xs text-slate-500 font-medium truncate">{user.email}</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator/>
									<DropdownMenuItem asChild className="rounded-xl py-2.5 cursor-pointer">
										<Link href="/events/favorites"
											  className="flex items-center gap-3 text-red-600 focus:text-red-600 focus:bg-red-50"><Heart
											className="w-4 h-4 fill-current"/> Omiljeni događaji</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator/>
									<DropdownMenuItem
										onClick={logout}
										className="rounded-xl py-2.5 cursor-pointer text-slate-500 focus:bg-slate-50"
									>
										<LogOut className="mr-3 h-4 w-4"/>
										Odjavi se
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					) : (
						<div className="hidden md:flex items-center gap-2">
							<Button variant="ghost" asChild
									className="rounded-xl font-bold text-slate-600 hover:text-indigo-600">
								<Link href="/login">Prijavi se</Link>
							</Button>
							<Button
								className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
								asChild>
								<Link href="/signup">Kreiraj nalog</Link>
							</Button>
						</div>
					)}
				</div>

			</div>
		</header>
	)
}
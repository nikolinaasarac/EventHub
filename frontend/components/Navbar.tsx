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
import { Button } from "@/components/ui/button"

export function NavBar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">

				<div className="flex items-center gap-8">
					<Link href="/home" className="font-bold text-xl text-indigo-600">
						Eventify
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
					<Button variant="ghost" asChild>
						<Link href="/login">Prijavi se</Link>
					</Button>
					<Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
						<Link href="/signup">Kreiraj nalog</Link>
					</Button>
				</div>

			</div>
		</header>
	)
}
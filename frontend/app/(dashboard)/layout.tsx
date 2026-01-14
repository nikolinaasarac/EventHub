"use client";

import React from "react";
import { NavBar} from "@/components/Navbar";

export default function DashboardLayout({
											children,
										}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col">

			<header className="border-b">
				<NavBar />
			</header>

			<main className="flex-1">
				{children}
			</main>

		</div>
	);
}
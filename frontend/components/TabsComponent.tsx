"use client"

import React from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import {cn} from "@/lib/utils"
import {LayoutGrid} from "lucide-react"

export interface TabItem {
	value: string;
	label: string;
	icon?: React.ReactNode;
	content: React.ReactNode;
}

interface TabbedContentProps {
	tabs: TabItem[];
	value: string;
	onValueChange: (value: string) => void;
	className?: string;
}

export function TabsComponent({tabs, value, onValueChange, className}: TabbedContentProps) {
	return (
		<Tabs
			value={value}
			onValueChange={onValueChange}
			className={cn("w-full space-y-6", className)}
		>
			<div className="flex items-center justify-between md:justify-start">
				<div className="block md:hidden w-full">
					<Select value={value} onValueChange={onValueChange}>
						<SelectTrigger className="w-full h-12 rounded-2xl border-slate-200 bg-white">
							<div className="flex items-center gap-3 font-semibold text-slate-700">
								<LayoutGrid className="w-4 h-4 text-indigo-600"/>
								<SelectValue placeholder="Izaberite sekciju"/>
							</div>
						</SelectTrigger>
						<SelectContent className="rounded-2xl border-slate-200">
							{tabs.map((tab) => (
								<SelectItem key={tab.value} value={tab.value}
											className="rounded-xl my-1 cursor-pointer">
									<div className="flex items-center gap-2">
										{tab.icon} {tab.label}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="hidden md:block">
					<TabsList
						className="bg-white border border-slate-200 p-1 h-auto rounded-[1.5rem] shadow-sm flex flex-row">
						{tabs.map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className="rounded-xl px-6 py-2.5 data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-2 transition-all  hover:cursor-pointer"
							>
								{tab.icon} {tab.label}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
			</div>

			{tabs.map((tab) => (
				<TabsContent key={tab.value} value={tab.value} className="outline-none">
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	);
}
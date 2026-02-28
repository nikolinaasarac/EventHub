"use client"

import React, {useState} from "react"
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
	defaultValue?: string;
	className?: string;
	onValueChange?: (value: string) => void; // <-- dodaj
}

export function TabsComponent({tabs, defaultValue, className, onValueChange}: TabbedContentProps) {
	const [activeTab, setActiveTab] = useState<string>(defaultValue || tabs[0]?.value || "");

	if (tabs.length === 0) return null;

	const handleChange = (value: string) => {
		setActiveTab(value);
		if (onValueChange) onValueChange(value); // poziva callback
	}

	return (
		<Tabs
			value={activeTab}
			onValueChange={handleChange} // <-- koristi novu funkciju
			className={cn("w-full space-y-6", className)}
		>
			<div className="flex items-center justify-between md:justify-start">
				{/* Mobile select */}
				<div className="block md:hidden w-full">
					<Select value={activeTab} onValueChange={handleChange}>
						<SelectTrigger
							className="w-full h-12 rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-indigo-500/20">
							<div className="flex items-center gap-3 font-semibold text-slate-700">
								<div className="bg-indigo-50 p-1.5 rounded-lg text-indigo-600">
									<LayoutGrid className="w-4 h-4"/>
								</div>
								<SelectValue placeholder="Izaberite sekciju"/>
							</div>
						</SelectTrigger>
						<SelectContent className="rounded-2xl border-slate-200 p-1 shadow-xl">
							{tabs.map(tab => (
								<SelectItem key={tab.value} value={tab.value}
											className="rounded-xl my-1 focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer">
									<div className="flex items-center gap-2 py-1">
										{tab.icon && <span className="opacity-70">{tab.icon}</span>}
										<span className="font-medium">{tab.label}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Desktop tabs */}
				<div className="hidden md:block">
					<TabsList
						className="bg-white border border-slate-200 p-1 h-auto rounded-[1.5rem] shadow-sm flex flex-row">
						{tabs.map(tab => (
							<TabsTrigger key={tab.value} value={tab.value}
										 className="rounded-xl px-6 py-2.5 data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-2 transition-all">
								{tab.icon}
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
			</div>

			<div className="mt-4">
				{tabs.map(tab => (
					<TabsContent key={tab.value} value={tab.value}
								 className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
						{tab.content}
					</TabsContent>
				))}
			</div>
		</Tabs>
	)
}
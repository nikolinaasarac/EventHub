import React from "react";
import {Card} from "@/components/ui/card";

interface Props {
	title: string;
	value: string;
	change?: string;
	icon: React.ReactNode;
}

export function StatCard({title, value, change, icon}: Props) {
	return (
		<Card className="p-6 rounded-3xl border-none shadow-lg shadow-slate-200/50 bg-white">
			<div className="flex justify-between items-start">
				<div className="p-3 bg-slate-50 text-indigo-600 rounded-2xl">
					{icon}
				</div>
				<div
					className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-full`}>
					{change}
				</div>
			</div>
			<div className="mt-6">
				<p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</p>
				<h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
			</div>
		</Card>
	);
}
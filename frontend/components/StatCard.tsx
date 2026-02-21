import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
	title: string;
	value: string;
	change?: string;
	icon: React.ReactNode;
	variant?: "indigo" | "emerald" | "amber" | "rose";
}

export function StatCard({ title, value, change, icon, variant = "indigo" }: Props) {
	const variants = {
		indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
		emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
		amber: "text-amber-600 bg-amber-50 border-amber-100",
		rose: "text-rose-600 bg-rose-50 border-rose-100",
	};

	return (
		<Card className="group relative overflow-hidden rounded-[2.5rem] border-none bg-white p-7 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
			{/* Dekorativni gradijent u uglu */}
			<div className={cn(
				"absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 blur-2xl transition-all group-hover:scale-150 group-hover:opacity-20",
				variant === "indigo" && "bg-indigo-600",
				variant === "emerald" && "bg-emerald-600",
				variant === "amber" && "bg-amber-600",
				variant === "rose" && "bg-rose-600"
			)} />

			<div className="relative z-10 flex flex-col h-full justify-between">
				<div className="flex items-center justify-between">
					<div className={cn("rounded-2xl p-4 transition-transform duration-500 group-hover:rotate-[10deg] border", variants[variant])}>
						{icon}
					</div>
					{change && (
						<span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
							{change}
						</span>
					)}
				</div>

				<div className="mt-8">
					<p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{title}</p>
					<h3 className="text-4xl font-black tracking-tight text-slate-900 leading-none">
						{value}
					</h3>
				</div>
			</div>
		</Card>
	);
}
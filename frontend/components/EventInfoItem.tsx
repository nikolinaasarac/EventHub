import React from "react";
import {cn} from "@/lib/utils";

type Variant = "default" | "success" | "warning" | "error" | "info";

interface EventInfoItemProps {
	icon: React.ReactNode;
	label: string;
	value: React.ReactNode;
	variant?: Variant;
}

const VARIANT_STYLES: Record<Variant, string> = {
	default: "bg-indigo-50 text-indigo-600",
	success: "bg-emerald-50 text-emerald-600",
	warning: "bg-amber-50 text-amber-600",
	error: "bg-rose-50 text-rose-600",
	info: "bg-sky-50 text-sky-600",
};

export const EventInfoItem = ({
								  icon,
								  label,
								  value,
								  variant = "default",
							  }: EventInfoItemProps) => {
	return (
		<div className="flex items-center gap-4 p-4 md:p-6">
			<div
				className={cn(
					"p-2 md:p-3 rounded-2xl",
					VARIANT_STYLES[variant]
				)}
			>
				{icon}
			</div>
			<div>
				<p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">
					{label}
				</p>
				<p className="text-sm md:text-base font-bold text-slate-900 truncate">
					{value}
				</p>
			</div>
		</div>
	);
};
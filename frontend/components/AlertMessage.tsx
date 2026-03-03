"use client"

import React from "react";
import {cn} from "@/lib/utils";
import {CheckCircle2, Clock, XCircle, Info} from "lucide-react";

type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertMessageProps {
	variant?: AlertVariant;
	title?: string;
	description?: string;
	className?: string;
	children?: React.ReactNode;
}

const VARIANT_STYLES: Record<
	AlertVariant,
	{
		container: string;
		icon: React.ReactNode;
	}
> = {
	success: {
		container:
			"bg-emerald-50 border-emerald-100 text-emerald-700",
		icon: <CheckCircle2 className="w-5 h-5"/>,
	},
	warning: {
		container:
			"bg-amber-50 border-amber-100 text-amber-700",
		icon: <Clock className="w-5 h-5 md:flex hidden" />,
	},
	error: {
		container:
			"bg-red-50 border-red-100 text-red-700",
		icon: <XCircle className="w-5 h-5"/>,
	},
	info: {
		container:
			"bg-indigo-50 border-indigo-100 text-indigo-700",
		icon: <Info className="w-5 h-5"/>,
	},
};

export const AlertMessage = ({
								 variant = "info",
								 title,
								 description,
								 className,
								 children,
							 }: AlertMessageProps) => {
	const styles = VARIANT_STYLES[variant];

	return (
		<div
			className={cn(
				"p-6 border rounded-[2rem] flex items-center justify-center gap-3 font-bold text-center",
				styles.container,
				className
			)}
		>
			{styles.icon}
			<div className="space-y-1">
				{title && (
					<p className="uppercase text-xs tracking-widest">
						{title}
					</p>
				)}
				{description && <p>{description}</p>}
				{children}
			</div>
		</div>
	);
};
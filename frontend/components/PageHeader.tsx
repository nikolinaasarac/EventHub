import React from "react";

interface Props {
	title: string;
	subtitle: string;
	icon: React.ElementType;
}

export default function PageHeader({title, subtitle, icon: Icon}: Props) {
	return (
		<div className="flex items-center gap-4">
			<div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
				<Icon className="w-4 h-4 md:w-8 md:h-8 text-white"/>
			</div>
			<div>
				<h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
				<p className="text-slate-500 font-medium">{subtitle}</p>
			</div>
		</div>
	)
}
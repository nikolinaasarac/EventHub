import React from "react";

type Props = {
	name: string;
	icon: React.ElementType;
	color: string;
};

export function CategoryCard({name, icon: Icon, color}: Props) {
	return (
		<div
			className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
			<div
				className={`p-4 rounded-full mb-3 transition-transform group-hover:scale-110 ${color}`}
			>
				<Icon className="w-6 h-6"/>
			</div>
			<span className="font-medium text-slate-700">
        {name}
      </span>
		</div>
	);
}
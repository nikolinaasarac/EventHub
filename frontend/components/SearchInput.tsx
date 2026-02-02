"use client"

import {Search as SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	onEnter?: () => void;
}

export function SearchInput({
								value,
								onChange,
								placeholder = "Pretraži...",
								className,
								onEnter
							}: SearchInputProps) {
	return (
		<div className={`relative ${className || ""}`}>
			<SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
			<Input
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
				className="w-full pl-10 h-12 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:border-none focus:!ring-indigo-500/20 transition-all"
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						onEnter?.();
					}
				}}
			/>
		</div>
	);
}
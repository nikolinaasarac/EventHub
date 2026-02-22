"use client";

import * as React from "react";
import {Calendar as CalendarIcon, X} from "lucide-react";
import {cn} from "@/lib/utils";

import {Button} from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

type Props = {
	value?: Date;
	onChange: (date: Date | undefined) => void;
	placeholder?: string;
	minDate?: Date;
	maxDate?: Date;
};

export function DateTimePicker({value, onChange, placeholder, minDate, maxDate}: Props) {
	const hours = Array.from({length: 24}, (_, i) => i);
	const minutes = Array.from({length: 60}, (_, i) => i);

	const setTime = (h?: number, m?: number) => {
		if (!value) return;
		const newDate = new Date(value);
		if (h !== undefined) newDate.setHours(h);
		if (m !== undefined) newDate.setMinutes(m);
		onChange(newDate);
	};

	return (<div className="relative w-full">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start text-left font-normal h-12 rounded-xl pr-10",
							!value && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4"/>
						{value ? format(value, "dd.MM.yyyy HH:mm") : placeholder}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto p-4 space-y-4 rounded-2xl">
					<Calendar
						mode="single"
						selected={value}
						onSelect={(d) => onChange(d ?? value)}
						initialFocus
						disabled={(date) => {
							if (minDate && date < minDate) return true;
							if (maxDate && date > maxDate) return true;
							return false;
						}}
					/>
					<div className="flex gap-2">
						<Select
							value={value ? String(value.getHours()) : undefined}
							onValueChange={(v) => setTime(Number(v), undefined)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Sat"/>
							</SelectTrigger>
							<SelectContent>
								{hours.map((h) => (
									<SelectItem key={h} value={String(h)}>
										{String(h).padStart(2, "0")}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select
							value={value ? String(value.getMinutes()) : undefined}
							onValueChange={(v) => setTime(undefined, Number(v))}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Min"/>
							</SelectTrigger>
							<SelectContent>
								{minutes.map((m) => (
									<SelectItem key={m} value={String(m)}>
										{String(m).padStart(2, "0")}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</PopoverContent>
			</Popover>

			{value && (
				<button
					type="button"
					className="hover:cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
					onClick={() => onChange(undefined)}
				>
					<X className="h-4 w-4"/>
				</button>
			)}
		</div>
	);
}
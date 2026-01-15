"use client"

import {ChevronLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";

interface Props {
	href: string;
	text: string;
}

export default function BackButton({href, text}:Props) {
	const router = useRouter();
	return (
		<Button variant="ghost" className="gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
				onClick={() => router.push(href)}>
			<ChevronLeft className="w-4 h-4"/> {text}
		</Button>
	)
}
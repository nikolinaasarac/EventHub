"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {SearchX, Home, ArrowLeft, Compass} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	const router = useRouter();

	return (
		<div
			className="relative min-h-screen w-full flex items-center justify-center bg-[#FDFDFF] overflow-hidden px-4 selection:bg-indigo-100">

			<div
				className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-100/50 blur-[120px] rounded-full pointer-events-none"/>
			<div
				className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-100/40 blur-[100px] rounded-full pointer-events-none"/>

			<div
				className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none font-black text-[25rem] text-slate-900">
				404
			</div>

			<div
				className="relative z-10 w-full max-w-lg text-center space-y-10 animate-in fade-in zoom-in duration-700">

				<div className="relative inline-block">
					<div className="absolute inset-0 bg-indigo-600 blur-2xl opacity-20 animate-pulse"/>
					<div
						className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 ring-1 ring-slate-200/50">
						<SearchX className="w-20 h-20 text-indigo-600 stroke-[1.5]"/>
					</div>
					<div
						className="absolute -bottom-2 -right-2 bg-indigo-600 p-3 rounded-2xl shadow-xl border-4 border-white text-white rotate-12">
						<Compass className="w-5 h-5 animate-spin-slow"/>
					</div>
				</div>

				<div className="space-y-4">
					<h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
						Stranica nije <span className="text-indigo-600">pronađena</span>
					</h1>
					<p className="text-slate-500 text-lg max-w-md mx-auto font-medium leading-relaxed">
						Izgleda da ste se izgubili u potrazi za događajem. Stranica koju tražite više ne postoji ili je
						premještena.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
					<Button
						onClick={() => router.back()}
						variant="outline"
						className="w-full sm:w-auto h-14 px-8 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all gap-2"
					>
						<ArrowLeft className="w-4 h-4"/>
						Vrati se nazad
					</Button>

					<Button
						asChild
						className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95 gap-2"
					>
						<Link href="/home">
							<Home className="w-4 h-4"/>
							Početna stranica
						</Link>
					</Button>
				</div>

				<p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] pt-8">
					Eventify <span className="text-indigo-300">.</span> 2026
				</p>
			</div>
		</div>
	);
}
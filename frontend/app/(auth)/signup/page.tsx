import {SignupForm} from "@/components/SignupForm";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeft} from "lucide-react";

export default function SignupPage() {
	return (
		<div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
			<div className="absolute top-0 left-0 w-full p-6 z-20">
				<Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
					<Link href="/home" className="flex items-center gap-2 font-medium">
						<ChevronLeft className="w-5 h-5"/>
						Idi na početnu
					</Link>
				</Button>
			</div>
			<div className="absolute inset-0 z-0">
				<Image
					src="/bg1.jpg"
					alt="Background"
					fill
					priority
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"/>
			</div>
			<div className="flex flex-col p-6 md:p-10 w-full bg-indigo-300">
				<div className="flex items-center justify-center h-full">
					<div
						className="z-10 items-center justify-center bg-white px-8 pb-8 rounded-2xl shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
						<div className="flex justify-center">
							<img src="/logo3.png" alt="Logo" className="h-30 md:h-40 w-auto z-20"/>
						</div>
						<SignupForm/>
					</div>
				</div>
			</div>
		</div>
	)
}
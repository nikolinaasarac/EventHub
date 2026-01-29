import {LoginForm} from "@/components/LoginForm"
import Image from "next/image";

export default function LoginPage() {
	return (
		<div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
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
							<img src="/logo3.png" alt="Logo" className="h-30 md:h-40 w-auto z-20" />
						</div>
						<LoginForm/>
					</div>
				</div>
			</div>
		</div>
	)
}
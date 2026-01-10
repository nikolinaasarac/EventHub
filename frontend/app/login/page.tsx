import { LoginForm } from "@/components/LoginForm"

export default function LoginPage() {
	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			<div className="bg-muted hidden lg:flex justify-center items-center h-screen w-full">
				<img
					src="/logo.png"
					alt="Image"
					className="max-h-full max-w-full object-contain dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
			<div className="flex flex-col p-6 md:p-10 h-screen" style={{ backgroundColor: "#7d6552" }}>

				<div className="flex items-center justify-center h-full">
					<div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
						<div className="lg:hidden flex justify-center">
							<img src="/logo.png" alt="Logo" className="h-50 w-auto" />
						</div>
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	)
}
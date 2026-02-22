"use client";
import {ResetPasswordForm} from "@/components/ResetPasswordForm"

export default function ResetPasswordPage() {
	const token = new URLSearchParams(window.location.search).get("token");
	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
			<div
				className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 w-full max-w-md border border-slate-100">
				<ResetPasswordForm token={token!}/>
			</div>
		</div>
	)
}
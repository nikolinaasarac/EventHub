"use client"
import {useEffect} from "react";
import {useAuth} from "@/context/auth-context";
import {useRouter, useSearchParams} from "next/navigation";
import {Spinner} from "@/components/ui/spinner";

export default function RootLayout({children}: { children: React.ReactNode }) {
	const {user, isLoading} = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!isLoading && user) {
			const redirectTo = "/home";
			router.replace(redirectTo);
		}
	}, [isLoading, user, router, searchParams]);

	if (isLoading || user) {
		return (
			<div className="h-screen flex justify-center items-center mb-6">
				<Spinner className="w-15 h-15"/>
			</div>
		);
	}

	return <>{children}</>;
}
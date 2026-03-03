"use client"

import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {UserRole} from "@/shared/enums/user-role.enum";
import {Spinner} from "@/components/ui/spinner";

export default function EditEventLayout({children}: { children: React.ReactNode }) {
	const {user, isLoading} = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading) {
			if (!user) {
				router.push("/login");
				console.log("User not logged in");
			} else if (!user.roles.some(r => r.name === UserRole.ORGANIZER || r.name === UserRole.ADMIN)) {
				console.log(user.roles)
				router.push("/home");
			}
		}
	}, [user, isLoading, router]);

	if (isLoading || !user) {
		return <div className="h-screen flex justify-center items-center mb-6">
			<Spinner className="w-15 h-15"/>
		</div>
	}

	return <>{children}</>;
}
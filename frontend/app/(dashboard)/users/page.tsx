"use client"

import React, {useEffect, useState} from "react";
import {DataTable} from "@/components/Table";
import UserService from "@/services/user.service";
import PageHeader from "@/components/PageHeader";
import {Users as UsersIcon, UserPlus, ShieldCheck, UserCircle, Briefcase} from "lucide-react";
import {Button} from "@/components/ui/button";
import {userColumns} from "@/columns/user.columns";
import {TabsComponent, TabItem} from "@/components/TabsComponent";
import {User} from "@/models/user.model";
import {UserRole} from "@/shared/enums/user-role.enum";
import {organizerColumns} from "@/columns/organizer.columns";
import {useRouter} from "next/navigation";

export default function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);
				const response = await UserService.getAllUsers();
				setUsers(response);
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUsers();
	}, []);

	console.log(users);

	const visitors = users.filter(u => u.roles?.some(r => r.name === UserRole.VISITOR));
	const organizers = users.filter(u => u.roles?.some(r => r.name === UserRole.ORGANIZER));
	const admins = users.filter(u => u.roles?.some(r => r.name === UserRole.ADMIN));

	const userTabs: TabItem[] = [
		{
			value: "all",
			label: "Svi korisnici",
			icon: <UserCircle className="w-4 h-4"/>,
			content: <DataTable columns={userColumns} data={users}/>
		},
		{
			value: "visitors",
			label: "Posjetioci",
			icon: <UserCircle className="w-4 h-4"/>,
			content: <DataTable columns={userColumns} data={visitors}/>
		},
		{
			value: "organizers",
			label: "Organizatori",
			icon: <Briefcase className="w-4 h-4"/>,
			content: <DataTable columns={organizerColumns} data={organizers}/>
		},
		{
			value: "admins",
			label: "Administratori",
			icon: <ShieldCheck className="w-4 h-4"/>,
			content: <DataTable columns={userColumns} data={admins}/>
		}
	];

	return (
		<div className="min-h-screen bg-slate-50/50 py-12">
			<div className="container mx-auto px-4 max-w-7xl space-y-10">

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
					<PageHeader
						title="Upravljanje korisnicima"
						subtitle="Pregledajte i administrirajte sve naloge na sistemu."
						icon={UsersIcon}
					/>
					<Button
						className="bg-indigo-600 hover:bg-indigo-700 h-12 px-6 rounded-2xl shadow-xl shadow-indigo-200 font-bold gap-2 transition-all hover:scale-105"
						onClick={() => router.push('/users/add-organizer')}>
						<UserPlus className="w-5 h-5"/>
						Dodaj organizatora
					</Button>
				</div>

				{isLoading ? (
					<div className="h-64 flex flex-col items-center justify-center gap-4">
						<div
							className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"/>
						<p className="text-slate-400 font-medium italic text-sm">Priprema podataka...</p>
					</div>
				) : (
					<TabsComponent tabs={userTabs} defaultValue="all"/>
				)}
			</div>
		</div>
	);
}
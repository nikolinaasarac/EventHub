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
import {useQueryFilters} from "@/shared/hooks/use-query-filters.hook";
import {QueryParams} from "@/models/query-params.model";
import EventService from "@/services/event.service";
import {PaginationComponent} from "@/components/Pagination";

export default function UsersPage() {
	const {
		search, setSearch, page, updatePage, filters, setRoles, urlSearch,
		urlPage
	} = useQueryFilters();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(1);

	const router = useRouter();

	useEffect(() => {
		const fetchUsers = async (
			roles: string[] = filters.roles
		) => {
			setLoading(true);
			const params: QueryParams = {page: urlPage, limit: 5, search: urlSearch};
			try {
				if (roles.length > 0) params.roles = roles.join(",");
				const response = await UserService.getUsers(params);
				setUsers(response.data);
				setTotalPages(response.meta.totalPages);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}
		fetchUsers();
	}, [urlPage, urlSearch, filters.roles])

	console.log(users);

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
			content: <DataTable columns={userColumns} data={users}/>
		},
		{
			value: "organizers",
			label: "Organizatori",
			icon: <Briefcase className="w-4 h-4"/>,
			content: <DataTable columns={organizerColumns} data={users}/>
		},
		{
			value: "admins",
			label: "Administratori",
			icon: <ShieldCheck className="w-4 h-4"/>,
			content: <DataTable columns={userColumns} data={users}/>
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

				{loading ? (
					<div className="h-64 flex flex-col items-center justify-center gap-4">
						<div
							className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"/>
						<p className="text-slate-400 font-medium italic text-sm">Priprema podataka...</p>
					</div>
				) : (
					<TabsComponent tabs={userTabs} defaultValue="all"/>
				)}

				{!loading && users.length > 0 && (
					<div className="mt-24 flex justify-center">
						<div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-sm">
							<PaginationComponent currentPage={urlPage} totalPages={totalPages}
												 onPageChange={updatePage}/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
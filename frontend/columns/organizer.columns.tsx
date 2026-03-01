import {ColumnDef} from "@tanstack/react-table";
import UserService from "@/services/user.service";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {UserCheck, UserX} from "lucide-react";

export const organizerColumns: ColumnDef<any>[] = [
	{
		accessorKey: "email",
		header: "Email",
		size: 200,
	},
	{
		accessorKey: "roles",
		header: "Uloga",
		size: 200,
		cell: ({row}) => {
			const roles = row.getValue("roles") as any[];
			return roles?.map(r => r.name).join(", ") || "";
		},
	},
	{
		accessorKey: "organizerProfile.displayName",
		header: "Ime organizatora",
		size: 200,
	},
	{
		accessorKey: "organizerProfile.contactEmail",
		header: "Email za kontakt",
		size: 200,
	},
	{
		accessorKey: "organizerProfile.phone",
		header: "Telefon",
		size: 200,
	}, {
		id: "actions",
		header: "Akcije",
		cell: ({row, table}) => {
			const user = row.original;
			const isActive = user.isActive;

			const handleToggle = async () => {
				try {
					await UserService.toggleStatus(user.id);
					toast.success(`Nalog uspješno ${isActive ? 'deaktiviran' : 'aktiviran'}!`);
					if ((table.options.meta as any)?.refreshData) {
						(table.options.meta as any).refreshData();
					}
				} catch (e) {
					toast.error("Greška pri promjeni statusa.");
				}
			};

			return (
				<Button
					variant="outline"
					size="sm"
					onClick={handleToggle}
					className={cn(
						"flex items-center gap-2 rounded-xl transition-all font-bold text-xs",
						isActive
							? "text-red-600 border-red-100 hover:bg-red-600 hover:text-white"
							: "text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white"
					)}
				>
					{isActive ? <UserX className="w-3.5 h-3.5"/> : <UserCheck className="w-3.5 h-3.5"/>}
					{isActive ? "Deaktiviraj" : "Aktiviraj"}
				</Button>
			)
		}
	}
]
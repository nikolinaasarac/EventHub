import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import UserService from "@/services/user.service";
import {Badge, UserCheck, UserX} from "lucide-react";
import {toast} from "sonner";
import {cn} from "@/lib/utils";

export const userColumns: ColumnDef<any>[] = [
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
		accessorKey: "isActive",
		header: "Status",
		cell: ({row}) => {
			const isActive = row.getValue("isActive") as boolean;
			return (
				<Badge
					className={isActive ? "bg-emerald-100 text-emerald-700 border-none" : "bg-red-100 text-red-700 border-none"}>
					{isActive ? "Aktivan" : "Deaktivan"}
				</Badge>
			);
		}
	},
	{
		id: "actions",
		header: "Akcije",
		cell: ({row, table}) => {
			const user = row.original;
			const isActive = user.isActive;

			const handleToggle = async () => {
				try {
					await UserService.toggleStatus(user.id);
					toast.success(`Nalog ${isActive ? 'deaktiviran' : 'aktiviran'} uspješno!`);
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
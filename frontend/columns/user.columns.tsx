import {ColumnDef} from "@tanstack/react-table";

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
	}
]
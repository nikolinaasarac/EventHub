import {ColumnDef} from "@tanstack/react-table";

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
	},
]
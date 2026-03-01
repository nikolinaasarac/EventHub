"use client"

import * as React from "react"
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
} from "@tanstack/react-table"
import {ChevronDown, Settings2} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	meta?: any
}

export function DataTable<TData, TValue>({
											 columns,
											 data,
											 meta,
										 }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		meta,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div className="w-full space-y-4">
			<div className="flex justify-end">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="h-10 rounded-xl border-slate-200 gap-2 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all"
						>
							<Settings2 className="w-4 h-4"/>
							Prilagodi kolone
							<ChevronDown className="w-4 h-4"/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="rounded-xl p-2 min-w-[180px]">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								const headerName = typeof column.columnDef.header === 'string'
									? column.columnDef.header
									: column.id;

								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize rounded-lg focus:bg-indigo-50 focus:text-indigo-600"
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(value)}
									>
										{headerName}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div
				className="rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
				<div className="overflow-x-auto">
					<Table className="w-full">
						<TableHeader className="bg-slate-900 border-none">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="h-14 px-6 text-left align-middle font-black text-slate-400 uppercase tracking-widest text-[10px]"
										>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										className="group border-b border-slate-50 last:border-none transition-colors hover:bg-slate-50/80"
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="p-5 align-middle text-slate-600 text-sm font-medium group-hover:text-slate-900"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length}
											   className="h-40 text-center text-slate-400 italic">
										Nema rezultata.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}
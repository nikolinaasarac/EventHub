import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import {cn} from "@/lib/utils";

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function PaginationComponent({currentPage, totalPages, onPageChange}: Props) {
	if (totalPages <= 1) return null;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
						className={cn(
							"cursor-pointer",
							currentPage === 1 && "pointer-events-none opacity-50"
						)}
					/>
				</PaginationItem>

				{Array.from({length: totalPages}).map((_, i) => {
					const page = i + 1;
					return (
						<PaginationItem key={page}>
							<PaginationLink
								className="cursor-pointer"
								isActive={page === currentPage}
								onClick={() => onPageChange(page)}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
						className={cn(
							"cursor-pointer",
							currentPage === totalPages && "pointer-events-none opacity-50"
						)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
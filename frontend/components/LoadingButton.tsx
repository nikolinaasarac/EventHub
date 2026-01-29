"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type ButtonProps = React.ComponentProps<typeof Button>;

interface LoadingButtonProps extends ButtonProps {
	loading?: boolean;
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
	return (
		<Button
			disabled={loading || props.disabled}
			{...props}
			className={`bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center hover:cursor-pointer hover:text-white ${props.className || ""}`}
		>
			{loading ? (
				<Spinner className="h-4 w-4 animate-spin" />
			) : (
				children
			)}
		</Button>
	);
}
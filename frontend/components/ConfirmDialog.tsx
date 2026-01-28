"use client";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel
} from "@/components/ui/alert-dialog";
import {LoadingButton} from "@/components/LoadingButton";
import {useState} from "react";


interface ConfirmDialogProps {
	open: boolean;
	title: string;
	description: React.ReactNode;
	confirmText?: string;
	cancelText?: string;
	confirmColor?: string;
	onConfirm: () => Promise<void>;
	onCancel: () => void;
}

export function ConfirmDialog({
								  open,
								  title,
								  description,
								  confirmText,
								  cancelText,
								  confirmColor,
								  onConfirm,
								  onCancel
							  }: ConfirmDialogProps) {
	const [loading, setLoading] = useState(false);

	const handleConfirm = async () => {
		setLoading(true);
		try {
			await onConfirm();
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onCancel}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>
					<LoadingButton
						loading={loading}
						className={`${confirmColor} hover:cursor-pointer`}
						onClick={handleConfirm}
					>
						{confirmText}
					</LoadingButton>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
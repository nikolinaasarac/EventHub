import { useFormikContext } from "formik";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImagePlus, X } from "lucide-react";

type Props = {
	name: string;
	label: string;
	aspectRatio?: number;
};

export function ImageUpload({ name, label, aspectRatio = 2 }: Props) {
	const { setFieldValue } = useFormikContext<any>();
	const [preview, setPreview] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => setPreview(reader.result as string);
		reader.readAsDataURL(file);

		setFieldValue(name, file);
	};

	return (
		<div className="space-y-4">
			<Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
				{label}
			</Label>

			<div className="relative group">
				<AspectRatio
					ratio={aspectRatio}
					className="flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden"
				>
					{preview ? (
						<>
							<img src={preview} className="w-full h-full object-cover" />
							<button
								type="button"
								onClick={() => {
									setPreview(null);
									setFieldValue(name, null);
								}}
								className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 shadow-md"
							>
								<X className="w-4 h-4" />
							</button>
						</>
					) : (
						<div className="flex flex-col items-center text-slate-400">
							<ImagePlus className="w-10 h-10 mb-2" />
							<span className="text-xs italic">Klikni za odabir slike</span>
						</div>
					)}
				</AspectRatio>

				<input
					type="file"
					accept="image/*"
					className="absolute inset-0 opacity-0 cursor-pointer"
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
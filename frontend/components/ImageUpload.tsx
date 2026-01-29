"use client"

import {useFormikContext} from "formik";
import {useState} from "react";
import {Label} from "@/components/ui/label";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {ImagePlus, X} from "lucide-react";
import {Button} from "@/components/ui/button";

type Props = {
	name: string;
	label: string;
	aspectRatio?: number;
	existingImageUrl?: string;
};

export function ImageUpload({name, label, aspectRatio = 2, existingImageUrl}: Props) {
	const [preview, setPreview] = useState<string | null>(existingImageUrl || null);
	const {setFieldValue} = useFormikContext<any>();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => setPreview(reader.result as string);
		reader.readAsDataURL(file);

		setFieldValue(name, file);
	};

	const handleRemove = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setPreview(null);
		setFieldValue(name, null);
	};

	return (
		<div className="space-y-4">
			<Label className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</Label>
			<div className="relative group">
				<AspectRatio ratio={aspectRatio}
							 className="relative flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden">
					{preview ? (
						<>
							<img src={preview} className="w-full h-full object-cover" alt="Preview"/>
							<Button onClick={handleRemove}
									type={"button"}
									className="absolute top-2 right-2 z-20 bg-white/90 p-1.5 rounded-full text-red-500 shadow-md">
								<X className="w-4 h-4"/>
							</Button>
						</>
					) : (
						<div className="flex flex-col items-center text-slate-400">
							<ImagePlus className="w-10 h-10 mb-2"/>
							<span className="text-xs italic">Klikni za odabir slike</span>
						</div>
					)}
					<input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
						   onChange={handleChange}/>
				</AspectRatio>
			</div>
		</div>
	);
}
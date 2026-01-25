import { ImagePlus, X } from "lucide-react";

interface ImageBoxProps {
	preview: string | null;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemove?: () => void;
	error?: string;
}

export function ImageBox({
							 preview,
							 onChange,
							 onRemove,
							 error,
						 }: ImageBoxProps) {
	return (
		<div className="space-y-2">
			<div
				className="
          relative group
          w-full aspect-square
          rounded-[2rem]
          border-2 border-dashed border-slate-200
          bg-slate-50
          flex items-center justify-center
          overflow-hidden
          transition-all
          hover:border-indigo-400
        "
			>
				{preview ? (
					<>
						<img
							src={preview}
							alt="Preview"
							className="w-full h-full object-cover"
						/>

						<button
							type="button"
							onClick={onRemove}
							className="
                absolute top-2 right-2
                bg-white/90
                p-1.5 rounded-full
                text-red-500
                shadow-md
                opacity-0 group-hover:opacity-100
                transition-opacity
              "
						>
							<X className="w-4 h-4" />
						</button>
					</>
				) : (
					<div className="text-center p-4">
						<ImagePlus className="w-10 h-10 text-slate-300 mx-auto mb-2" />
						<span className="text-xs text-slate-400 font-medium italic">
              Klikni za odabir slike
            </span>
					</div>
				)}

				<input
					type="file"
					accept="image/*"
					className="absolute inset-0 opacity-0 cursor-pointer"
					onChange={onChange}
				/>
			</div>

			{error && (
				<p className="text-[10px] text-red-500 italic">{error}</p>
			)}
		</div>
	);
}
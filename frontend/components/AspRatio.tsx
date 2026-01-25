import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspRatio() {
	return (
		<div className="w-full max-w-sm">
			<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
				<Image
					src="/logo.png"
					alt="Photo"
					fill
					className="w-full rounded-lg object-cover grayscale dark:brightness-20"
				/>
			</AspectRatio>
		</div>
	)
}

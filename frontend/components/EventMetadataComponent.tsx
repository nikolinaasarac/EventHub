import {EventMetadata} from "@/models/event-metadata.model";
import {defaultMetadataIcon, metadataConfig} from "@/shared/constants/metadata-config";

interface EventMetadataProps {
	metadata?: EventMetadata;
}

export function EventMetadataComponent({metadata}: EventMetadataProps) {
	if (!metadata) return null;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
			{Object.entries(metadata).map(([key, value]) => {
				const config = metadataConfig[key];

				return (
					<div
						key={key}
						className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100"
					>
						<span className="mr-2">{config?.icon || defaultMetadataIcon}</span>
						<div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {config?.label || key}
              </span>
							<span className="text-slate-700 font-medium">{value}</span>
						</div>
					</div>
				);
			})}
		</div>
	);
}
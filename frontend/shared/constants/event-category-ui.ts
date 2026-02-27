import {
	Music,
	Trophy,
	LucideIcon, PencilIcon,
} from "lucide-react";
import {EventCategory} from "@/shared/enums/event-categories.enum"

export type CategoryUIConfig = {
	icon: LucideIcon;
	color: string;
};

export const CATEGORY_UI_MAP: Record<EventCategory, CategoryUIConfig> = {
	[EventCategory.KULTURA_I_ZABAVA]: {
		icon: Music,
		color: "bg-blue-100 text-blue-600",
	},
	/*konferencije: {
		icon: Laptop,
		color: "bg-purple-100 text-purple-600",
	},
	'Konfe': {
		icon: Mic2,
		color: "bg-pink-100 text-pink-600",
	},*/
	[EventCategory.SPORT]: {
		icon: Trophy,
		color: "bg-orange-100 text-orange-600",
	},
	[EventCategory.EDUKACIJA]: {
		icon: PencilIcon,
		color: "bg-green-100 text-green-600",
	},

};
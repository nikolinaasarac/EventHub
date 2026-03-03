import {
	Music,
	Trophy,
	LucideIcon, PencilIcon, Utensils,
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
	[EventCategory.SPORT]: {
		icon: Trophy,
		color: "bg-orange-100 text-orange-600",
	},
	[EventCategory.EDUKACIJA]: {
		icon: PencilIcon,
		color: "bg-green-100 text-green-600",
	},
	[EventCategory.GASTRONOMIJA]: {
		icon: Utensils,
		color: "bg-red-100 text-red-600",
	}

};
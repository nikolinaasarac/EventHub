import {EventStatus} from "@/shared/enums/event-status.enum";


export const EVENT_STATUS_STYLES = {
	[EventStatus.ZAKAZAN]: {label: "Zakazan", color: "bg-blue-500/90"},
	[EventStatus.OTKAZAN]: {label: "Otkazan", color: "bg-red-500/90"},
	[EventStatus.ZAVRSEN]: {label: "Završen", color: "bg-slate-600/90"},
};

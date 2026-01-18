import React from "react";
import {Car, Wifi, Accessibility, Coffee, CheckCircle2} from "lucide-react";

export const AMENITY_ICONS: Record<string, React.ReactNode> = {
	"Besplatan parking": <Car className="w-5 h-5"/>,
	"Wi-Fi": <Wifi className="w-5 h-5"/>,
	"Pristup kolicima": <Accessibility className="w-5 h-5"/>,
	"Kafić": <Coffee className="w-5 h-5"/>,
};

export const DEFAULT_AMENITY_ICON = (
	<CheckCircle2 className="w-5 h-5"/>
);
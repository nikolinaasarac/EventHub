import {Activity, Guitar, Home, Music, Square, Users} from "lucide-react";
import {JSX} from "react";

export const metadataConfig: Record<
	string,
	{ label: string; icon: JSX.Element }
> = {
	homeTeam: {label: 'Domaćin', icon: <Home className="text-slate-500"/>},
	awayTeam: {label: 'Gost', icon: <Users className="text-slate-500"/>},
	referee: {label: 'Sudija', icon: <Activity className="text-slate-500"/>},
	performer: {label: 'Izvođač', icon: <Music className="text-slate-500"/>},
	genre: {label: 'Žanr', icon: <Guitar className="text-slate-500"/>},
};

export const defaultMetadataIcon = <Square className="text-slate-500"/>;
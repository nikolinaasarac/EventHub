import {
	Activity, Beef, Beer,
	BookOpen,
	ChefHat, Dog,
	DoorOpen,
	Grape,
	Guitar,
	Home,
	Music,
	Square,
	Users,
	UtensilsCrossed, Wine
} from "lucide-react";
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
		gatesOpen: {label: 'Ulaz od', icon: <DoorOpen className="text-slate-500"/>},
		speaker: {label: 'Predavač', icon: <Users className="text-slate-500"/>},
		topic: {label: 'Tema', icon: <BookOpen className="text-slate-500"/>},
		winery: {label: 'Vinarija', icon: <Grape className="text-slate-500"/>},
		sommelier: {label: 'Somelijer', icon: <Users className="text-slate-500"/>},
		chef: {label: 'Glavni šef', icon: <ChefHat className="text-slate-500"/>},
		cuisineType: {label: 'Kuhinja', icon: <UtensilsCrossed className="text-slate-500"/>},
	}
;

export const defaultMetadataIcon = <Square className="text-slate-500"/>;


export interface MetadataField {
	name: string;
	label: string;
	placeholder: string;
	type: string;
	icon: React.ReactNode;
}

export const METADATA_FIELDS_BY_SUBCATEGORY: Record<string, MetadataField[]> = {
	"Fudbal": [
		{
			name: "homeTeam",
			label: "Domaći tim",
			placeholder: "npr. FK Slavija",
			type: "text",
			icon: <Home className="text-slate-500"/>
		},
		{
			name: "awayTeam",
			label: "Gostujući tim",
			placeholder: "npr. FK Romanija",
			type: "text",
			icon: <Users className="text-slate-500"/>
		},
		{
			name: "referee",
			label: "Glavni sudija",
			placeholder: "Ime i prezime",
			type: "text",
			icon: <Activity className="text-slate-500"/>
		}
	],
	"Kosarka": [
		{
			name: "homeTeam",
			label: "Domaći tim",
			placeholder: "npr. KK Partizan",
			type: "text",
			icon: <Home className="text-slate-500"/>
		},
		{
			name: "awayTeam",
			label: "Gostujući tim",
			placeholder: "npr. KK Crvena zvezda",
			type: "text",
			icon: <Users className="text-slate-500"/>
		},
		{
			name: "referee",
			label: "Sudija",
			placeholder: "Ime i prezime",
			type: "text",
			icon: <Activity className="text-slate-500"/>
		},
		{
			name: "competition",
			label: "Takmičenje",
			placeholder: "npr. ABA Liga",
			type: "text",
			icon: <Activity className="text-slate-500"/>
		}
	],
	"Konferencija": [
		{
			name: "speaker",
			label: "Predavač",
			placeholder: "Ime i prezime",
			type: "text",
			icon: <Users className="text-slate-500"/>
		},
		{
			name: "topic",
			label: "Tema",
			placeholder: "npr. Digitalna transformacija",
			type: "text",
			icon: <BookOpen className="text-slate-500"/>
		}
	],
	"Koncert": [
		{
			name: "performer",
			label: "Izvođač",
			placeholder: "npr. Zdravko Čolić",
			type: "text",
			icon: <Users className="text-slate-500"/>
		},
		{
			name: "genre",
			label: "Žanr",
			placeholder: "Pop, Rock, Techno...",
			type: "text",
			icon: <Users className="text-slate-500"/>
		},
		{
			name: "gatesOpen",
			label: "Ulaz od",
			placeholder: "npr. 19:00",
			type: "text",
			icon: <Users className="text-slate-500"/>
		}
	],
	"Degustacija vina": [
		{
			name: "winery",
			label: "Vinarija",
			placeholder: "Naziv vinarije",
			type: "text",
			icon: <Grape className="text-slate-500"/>
		},
		{
			name: "sommelier",
			label: "Somelijer",
			placeholder: "Ime i prezime",
			type: "text",
			icon: <Users className="text-slate-500"/>
		},
		{
			name: "wineCount",
			label: "Broj uzoraka",
			placeholder: "npr. 5",
			type: "number",
			icon: <Wine className="text-slate-500"/>
		}
	],
	"Kulinarska radionica": [
		{
			name: "chef",
			label: "Glavni šef",
			placeholder: "Ime instruktora",
			type: "text",
			icon: <ChefHat className="text-slate-500"/>
		},
		{
			name: "cuisineType",
			label: "Tip kuhinje",
			placeholder: "npr. Italijanska",
			type: "text",
			icon: <UtensilsCrossed className="text-slate-500"/>
		}
	]
};
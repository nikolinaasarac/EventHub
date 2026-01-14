import {
	Search,
	MapPin,
	Calendar as CalendarIcon,
	Music,
	Mic2,
	Trophy,
	Laptop,
	ArrowRight
} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {CategoryCard} from "@/components/CategoryCard";
import {EventCard} from "@/components/EventCard";

const categories = [
	{name: 'Koncerti', icon: <Music className="w-6 h-6"/>, color: 'bg-blue-100 text-blue-600'},
	{name: 'Konferencije', icon: <Laptop className="w-6 h-6"/>, color: 'bg-purple-100 text-purple-600'},
	{name: 'Nastupi', icon: <Mic2 className="w-6 h-6"/>, color: 'bg-pink-100 text-pink-600'},
	{name: 'Sport', icon: <Trophy className="w-6 h-6"/>, color: 'bg-orange-100 text-orange-600'},
];

const featuredEvents = [
	{
		id: 1,
		title: "Koncert Zdravko Čolić",
		date: "25. Avgust",
		location: "Stadion FK Slavija, Istočno Sarajevo",
		price: "25 KM",
		image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
		category: "Koncert"
	},
	{
		id: 2,
		title: "Tech Summit 2024",
		date: "15. Oktobar",
		location: "Dvorana Slavija, Istočno Sarajevo",
		price: "Besplatno",
		image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
		category: "Edukacija"
	},
	{
		id: 3,
		title: "Vinski Maraton",
		date: "10. Septembar",
		location: "Studenstki trg, Pale",
		price: "20 KM",
		image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
		category: "Lifestyle"
	}
];

export default function Page() {
	return (
		<div className="min-h-screen bg-slate-50">
			<section
				className="relative h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
				<div className="absolute inset-0 opacity-40">
					<img
						src="/background.png"
						className="w-full h-full object-cover"
						alt="Pozadina"
					/>
				</div>
				<div className="relative z-10 container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6">Tražiš događaj?</h1>
					<p className="text-lg md:text-xl mb-10 text-slate-200">Moram smisliti neki podnaslov ovdje</p>

					<div
						className="bg-white shadow-2xl p-2 md:p-4 rounded-xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto items-center">
						<div className="relative w-full flex-1">
							<Search className="absolute left-3 top-3 text-slate-400 w-5 h-5"/>
							<Input className="pl-10 h-12 border-none text-slate-900 focus-visible:ring-0"
								   placeholder="Šta tražiš?"/>
						</div>
						<div className="hidden md:block w-[1px] h-8 bg-slate-200"/>
						<div className="relative w-full flex-1">
							<MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5"/>
							<Input className="pl-10 h-12 border-none text-slate-900 focus-visible:ring-0"
								   placeholder="Gdje?"/>
						</div>
						<div className="hidden md:block w-[1px] h-8 bg-slate-200"/>
						<div className="relative w-full flex-1">
							<CalendarIcon className="absolute left-3 top-3 text-slate-400 w-5 h-5"/>
							<Input className="pl-10 h-12 border-none text-slate-900 focus-visible:ring-0"
								   placeholder="Kada?"/>
						</div>
						<Button className="w-full md:w-auto h-12 px-8 bg-indigo-600  hover:bg-indigo-700">
							Pretraži
						</Button>
					</div>
				</div>
			</section>

			<section className="py-16 container mx-auto px-4">
				<h2 className="text-xl md:text-2xl font-bold mb-8">Kategorije</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{categories.map((cat) => (
						<CategoryCard key={cat.name} name={cat.name} icon={cat.icon} color={cat.color}/>
					))}
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-end mb-8">
						<div>
							<h2 className="text-3xl font-bold">Najnoviji događaji</h2>
						</div>
						<Button variant="ghost" className="text-indigo-600">Vidi sve <ArrowRight
							className="ml-2 w-4 h-4"/></Button>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{featuredEvents.map((event) => (
							<EventCard
								key={event.id}
								id={event.id}
								title={event.title}
								image={event.image}
								category={event.category}
								date={event.date}
								location={event.location}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 container mx-auto px-4 text-center">
				<h2 className="text-3xl font-bold mb-12">Kako funkcioniše?</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<div className="flex flex-col items-center">
						<div
							className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 text-2xl font-bold">1
						</div>
						<h3 className="text-xl font-semibold mb-2">Pronađi</h3>
						<p className="text-slate-500">Pretražite događaje.</p>
					</div>
					<div className="flex flex-col items-center">
						<div
							className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 text-2xl font-bold">2
						</div>
						<h3 className="text-xl font-semibold mb-2">Rezerviši</h3>
						<p className="text-slate-500">Kupi kartu sigurno i brzo u par klikova.</p>
					</div>
					<div className="flex flex-col items-center">
						<div
							className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 text-2xl font-bold">3
						</div>
						<h3 className="text-xl font-semibold mb-2">Uživaj</h3>
						<p className="text-slate-500">Pokaži QR kod na ulazu!</p>
					</div>
				</div>
			</section>

			<section className="bg-indigo-600 py-16">
				<div className="container mx-auto px-4 text-center text-white">
					<h2 className="text-3xl font-bold mb-4">Organizujete sopstveni događaj?</h2>
					<p className="mb-8 text-indigo-100">Postanite organizator i kreirajte događaj</p>
					<Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-slate-100">
						Kreiraj događaj
					</Button>
				</div>
			</section>
		</div>
	);
}
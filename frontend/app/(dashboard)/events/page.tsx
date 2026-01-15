import {Search} from "lucide-react";
import {EventCard} from "@/components/EventCard";
import {MultiSelect} from "@/components/MultiSelect";
import {EventTypes} from "@/shared/globals";

export default function EventsPage() {
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
		},
		{
			id: 4,
			title: "Koncert Zdravko Čolić",
			date: "25. Avgust",
			location: "Stadion FK Slavija, Istočno Sarajevo",
			price: "25 KM",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Koncert"
		},
		{
			id: 5,
			title: "Tech Summit 2024",
			date: "15. Oktobar",
			location: "Dvorana Slavija, Istočno Sarajevo",
			price: "Besplatno",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Edukacija"
		},
		{
			id: 6,
			title: "Vinski Maraton",
			date: "10. Septembar",
			location: "Studenstki trg, Pale",
			price: "20 KM",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Lifestyle"
		},
		{
			id: 7,
			title: "Koncert Zdravko Čolić",
			date: "25. Avgust",
			location: "Stadion FK Slavija, Istočno Sarajevo",
			price: "25 KM",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Koncert"
		},
		{
			id: 8,
			title: "Tech Summit 2024",
			date: "15. Oktobar",
			location: "Dvorana Slavija, Istočno Sarajevo",
			price: "Besplatno",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Edukacija"
		},
		{
			id: 9,
			title: "Vinski Maraton",
			date: "10. Septembar",
			location: "Studenstki trg, Pale",
			price: "20 KM",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Lifestyle"
		},
		{
			id: 10,
			title: "Koncert Zdravko Čolić",
			date: "25. Avgust",
			location: "Stadion FK Slavija, Istočno Sarajevo",
			price: "25 KM",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Koncert"
		},
		{
			id: 11,
			title: "Tech Summit 2024",
			date: "15. Oktobar",
			location: "Dvorana Slavija, Istočno Sarajevo",
			price: "Besplatno",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Edukacija"
		},
		{
			id: 12,
			title: "Vinski Maraton",
			date: "10. Septembar",
			location: "Studenstki trg, Pale",
			price: "20 KM",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Lifestyle"
		},
		{
			id: 13,
			title: "Koncert Zdravko Čolić",
			date: "25. Avgust",
			location: "Stadion FK Slavija, Istočno Sarajevo",
			price: "25 KM",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Koncert"
		},
		{
			id: 14,
			title: "Tech Summit 2024",
			date: "15. Oktobar",
			location: "Dvorana Slavija, Istočno Sarajevo",
			price: "Besplatno",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Edukacija"
		},
		{
			id: 15,
			title: "Vinski Maraton",
			date: "10. Septembar",
			location: "Studenstki trg, Pale",
			price: "20 KM",
			image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=500",
			category: "Lifestyle"
		}
	];
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-end mb-8">
					<div className="relative flex-1 min-w-[200px]">
						<Search
							className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
						<input type="text" placeholder="Šta tražite?"
							   className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"/>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<MultiSelect title={"Kategorije"} options={EventTypes}
									 selectedValues={[]}
									 onSelectChange={(values) => {
										 console.log("Selected values:", values);
									 }}/>
					</div>
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
	)
}
"use client";

import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import {Venue} from "@/models/venue.model";
import {useRouter} from "next/navigation";

const markerIcon = new L.Icon({
	iconUrl: "/marker-icon.png",
	iconRetinaUrl: "/marker-icon.png",
	iconSize: [25, 25],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

interface Props {
	venues?: Venue[];
	venue?: Venue;
	height?: string;
}

export default function VenueMap({venues, venue, height = "500px"}: Props) {
	const router = useRouter();
	const markers = venue ? [venue] : venues || [];

	const center: [number, number] = markers.length
		? [Number(markers[0].latitude), Number(markers[0].longitude)]
		: [43.85, 18.38];

	return (
		<MapContainer
			center={center}
			zoom={12}
			style={{height, width: "100%"}}
			className="rounded-xl"
		>
			<TileLayer
				attribution='&copy; OpenStreetMap contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{markers.map((v) => (
				<Marker
					key={v.id}
					position={[Number(v.latitude), Number(v.longitude)]}
					icon={markerIcon}
				>
					<Popup>
						<div onClick={() => router.push(`/events`)} className="cursor-pointer p-1">
							<p className="font-semibold">{v.name} {v.city.name}</p>
							<p className="text-sm text-gray-500">{v.address}</p>
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}
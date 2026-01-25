"use client"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {FormikHelpers} from "formik";

const markerIcon = new L.Icon({
	iconUrl: "/marker-icon.png",
	iconSize: [25, 25],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

interface Props {
	setFieldValue: FormikHelpers<{
		latitude: number;
		longitude: number;
	}>["setFieldValue"];
	lat?: number | null;
	lng?: number | null;
}

export function MapPicker({ setFieldValue, lat, lng }: Props) {
	const [position, setPosition] = useState<[number, number] | null>(
		lat && lng ? [lat, lng] : null
	);

	function MapEvents() {
		useMapEvents({
			click(e) {
				setPosition([e.latlng.lat, e.latlng.lng]);
				setFieldValue("latitude", e.latlng.lat);
				setFieldValue("longitude", e.latlng.lng);
			},
		});
		return position ? <Marker position={position} icon={markerIcon} /> : null;
	}

	return (
		<div className="h-[350px] w-full rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner">
			<MapContainer center={[43.83, 18.57]} zoom={13} className="h-full w-full">
				<TileLayer
					attribution='&copy; OpenStreetMap contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapEvents />
			</MapContainer>
		</div>
	);
}
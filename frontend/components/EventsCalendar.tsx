import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import {EventInput} from "@fullcalendar/core";

interface Props {
	events: EventInput[];
	handleEventClick: (event: EventInput) => void;
}

export function EventsCalendar({events, handleEventClick}: Props) {
	return (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			locale="sr-latn"
			headerToolbar={{
				left: "prev,next today",
				center: "title",
				right: "dayGridMonth,timeGridWeek",
			}}
			buttonText={{
				today: "Danas",
				month: "Mjesec",
				week: "Sedmica",
				day: "Dan",
			}}
			events={events}
			eventClick={handleEventClick}
			editable={false}
			height="800px"
			expandRows={true}
			dayMaxEvents={true}
			eventContent={(eventInfo) => (
				<div className="px-2 py-1 overflow-hidden">
					<div className="font-bold text-[11px] truncate">{eventInfo.event.title}</div>
				</div>
			)}
		/>
	)
}
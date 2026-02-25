import {MultiSelect} from "@/components/MultiSelect";
import {EventStatus} from "@/shared/enums/event-status.enum";

interface Props {
	handleSelectChange: (selectedValue: string[]) => void,
	selectedStatuses: string[]
}

function getStatusLabel(status: EventStatus): string {
	switch (status) {
		case EventStatus.ZAKAZAN:
			return "Zakazan";
		case EventStatus.ZAVRSEN:
			return "Završen";
		case EventStatus.OTKAZAN:
			return "Otkazan";
		default:
			return status;
	}
}

export function EventStatusesMultiSelect({
											 handleSelectChange,
											 selectedStatuses
										 }: Props) {

	const statusOptions = Object.values(EventStatus).map(status => ({
		key: status,
		value: getStatusLabel(status)
	}));

	const handleStatusesSelected = (selectedStatuses: string[]) => {
		handleSelectChange(selectedStatuses);
	};

	return (
		<MultiSelect
			title={"Status događaja"}
			options={statusOptions}
			selectedValues={selectedStatuses}
			onSelectChange={handleStatusesSelected}
		/>
	);
}
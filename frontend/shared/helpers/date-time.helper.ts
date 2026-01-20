export class DateTimeHelper {

	static formatDate(isoString: string): string {
		if (!isoString) return '';

		const date = new Date(isoString);

		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();

		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		return `${day}.${month}.${year} ${hours}:${minutes}`;
	}

	static formatOnlyDate(isoString: string): string {
		if (!isoString) return '';

		const date = new Date(isoString);

		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();

		return `${day}.${month}.${year}`;
	}

	static formatOnlyTime(isoString: string): string {
		if (!isoString) return '';

		const date = new Date(isoString);

		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		return `${hours}:${minutes}`;
	}
}

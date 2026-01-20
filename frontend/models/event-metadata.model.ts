export interface FootballMetadata {
	homeTeam: string;
	awayTeam: string;
	referee?: string;
}

export interface ConcertMetadata {
	performer: string;
	genre?: string;
}

export type EventMetadata = FootballMetadata | ConcertMetadata;
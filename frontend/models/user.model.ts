export interface User {
	id: string,
	email: string,
	roles: string[]
}

export interface LoginResponse {
	user: User
	accessToken: string
}
'use client';

import React, {createContext, useState, useContext, useMemo, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {User} from "@/models/user.model";
import AuthService from "@/services/user.service";
import UserService from "@/services/user.service";
import {authToken} from "@/services/api/auth.token";

interface AuthContextProps {
	user: User | null;
	setUser: (user: User | null) => void;
	isLoading: boolean;
	isLoggingIn: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
	const router = useRouter();

	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const login = async (email: string, password: string) => {
		try {
			const params = new URLSearchParams(window.location.search);
			const redirect = params.get("redirect");
			setIsLoggingIn(true);
			const response = await AuthService.login(email, password);
			setUser(response.user);
			authToken.set(response.accessToken);
			toast.success('Prijava uspješna');
			if (redirect === '' || redirect === null)
				router.push('/home');
			else
				router.push(redirect)
		} catch (error) {
			console.error('Prijava neuspješna: ', error);
			toast.error('Prijava neuspješna');
		} finally {
			setIsLoggingIn(false);
		}
	};

	const signup = async (email: string, password: string) => {
		try {
			const response = await AuthService.register(email, password);
			setUser(response.user);
			toast.success('Nalog uspješno kreiran');
			router.push('/home');
		} catch (error) {
			console.error('Greška prilikom kreiranja naloga', error);
			toast.error('Greška prilikom kreiranja naloga');
		}
	};

	const rehydrateUser = async () => {
		try {
			const refreshRes = await UserService.refreshToken();
			authToken.set(refreshRes.accessToken);
			const user = await UserService.getCurrentUser();
			setUser(user);
		} catch (err) {
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};


	const logout = async () => {
		try {
			await UserService.logout();
			setUser(null);
			authToken.clear();
			router.push('/login');

			toast.success('Uspješno odjavljeni');
		} catch (error) {
			console.error('Logout failed:', error);
			toast.error('Logout neuspješan');
		}
	};


	useEffect(() => {
		rehydrateUser();
	}, []);

	const value = useMemo(
		() => ({user, setUser, login, isLoading, isLoggingIn, logout, signup}),
		[user, isLoading, isLoggingIn]
	);

	if (isLoading) return null;

	return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}
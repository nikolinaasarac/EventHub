'use client';

import React, {createContext, useState, useContext, useEffect, useMemo} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {User} from "@/models/user.model";
import AuthService from "@/services/user.service";

interface AuthContextProps {
	user: User | null;
	setUser: (user: User | null) => void;
	isLoading: boolean;
	isLoggingIn: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
	const router = useRouter();

	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	useEffect(() => {
	}, []);

	const login = async (email: string, password: string) => {
		try {
			setIsLoggingIn(true);
			console.log(email, password);
			const user = await AuthService.login(email, password);
			setUser(user);
			toast.success('Prijava uspješna');
		} catch (error) {
			console.error('Prijava neuspješna: ', error);
			toast.error('Prijava neuspješna');
		} finally {
			setIsLoggingIn(false);
		}
	};

	/*const rehydrateUser = async () => {
		try {
			const user = await UsersService.getCurrentUser();
			setUser(user);
		} catch (error) {
			console.error('Failed to rehydrate user:', error);
			logout();
		} finally {
			setIsLoading(false);
		}
	};*/


	const logout = () => {
		setUser(null);
		router.push('/login');
	};

	const value = useMemo(
		() => ({user, setUser, login, isLoading, isLoggingIn, logout}),
		[user, isLoading, isLoggingIn, logout]
	);

	return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}
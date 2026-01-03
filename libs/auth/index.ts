import Cookies from 'js-cookie';
import { userVar } from '../../apollo/store';
import client from '../../apollo/client';

const JWT_TOKEN_KEY = 'jwt_token';

export const getJwtToken = (): string | null => {
	if (typeof window === 'undefined') return null;
	return Cookies.get(JWT_TOKEN_KEY) || null;
};

export const setJwtToken = (token: string): void => {
	if (typeof window === 'undefined') return;
	Cookies.set(JWT_TOKEN_KEY, token, { expires: 200 }); // 200 days
};

export const logOut = (): void => {
	if (typeof window === 'undefined') return;
	Cookies.remove(JWT_TOKEN_KEY);
	userVar(null);
	client.clearStore();
};

export const updateUserInfo = async (token: string): Promise<void> => {
	try {
		// Decode JWT token to get user info
		// For now, we'll just set the token and let components handle user data
		setJwtToken(token);
		// You can decode the token and set userVar here if needed
		// const decoded = jwt_decode(token);
		// userVar(decoded);
	} catch (error) {
		console.error('Error updating user info:', error);
		logOut();
	}
};


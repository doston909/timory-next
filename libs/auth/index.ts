import decodeJWT from 'jwt-decode';
import { initializeApollo } from '../../apollo/client';
import { userVar } from '../../apollo/store';
import { CustomJwtPayload } from '../types/customJwtPayload';
import { sweetMixinErrorAlert } from '../sweetAlert';
import { LOGIN, SIGN_UP } from '../../apollo/user/mutation';
import { getJwtToken as getStoredToken, setJwtToken as setStoredToken } from '../auth-token';

export const getJwtToken = getStoredToken;
export function setJwtToken(token: string) {
	setStoredToken(token);
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('login', Date.now().toString());
	}
}

export const logIn = async (memberName: string, password: string): Promise<void> => {
	try {
		const { jwtToken } = await requestJwtToken({ memberName, password });

		if (jwtToken) {
			updateStorage({ jwtToken });
			updateUserInfo(jwtToken);
		}
	} catch (err) {
		console.warn('login err', err);
		logOut();
	}
};

const requestJwtToken = async ({
	memberName,
	password,
}: {
	memberName: string;
	password: string;
}): Promise<{ jwtToken: string }> => {
	const apolloClient = await initializeApollo();

	try {
		const result = await apolloClient.mutate({
			mutation: LOGIN,
			variables: { input: { memberName, memberPassword: password } },
			fetchPolicy: 'network-only',
		});

		const loginData = result?.data?.login;
		const accessToken = loginData?.accessToken;
		if (!accessToken) {
			const msg = (result as any)?.errors?.[0]?.message ?? '';
			if (msg) await sweetMixinErrorAlert(msg.includes('blocked') ? 'User has been blocked' : msg || 'Login failed');
			else await sweetMixinErrorAlert('Invalid name or password, or account has been deleted');
			throw new Error('token error');
		}
		return { jwtToken: accessToken };
	} catch (err: any) {
		if (err?.message === 'token error') throw err;
		const msg = err?.graphQLErrors?.[0]?.message ?? err?.networkError?.message ?? err?.message ?? '';
		if (msg.includes('No member with that member nick!') || msg.includes('Wrong password')) {
			await sweetMixinErrorAlert('Invalid name or password');
		} else if (msg.includes('blocked')) {
			await sweetMixinErrorAlert('User has been blocked');
		} else {
			await sweetMixinErrorAlert(msg || 'Login failed');
		}
		throw new Error('token error');
	}
};

export const signUp = async (
	memberName: string,
	memberEmail: string,
	memberPassword: string,
	memberConfirmPassword: string,
	memberType: 'USER' | 'DEALER'
): Promise<void> => {
	try {
		const { jwtToken } = await requestSignUpJwtToken({
			memberName,
			memberEmail,
			memberPassword,
			memberConfirmPassword,
			memberType,
		});

		if (jwtToken) {
			updateStorage({ jwtToken });
			updateUserInfo(jwtToken);
		}
	} catch (err) {
		console.warn('signup err', err);
		throw err;
	}
};

const requestSignUpJwtToken = async ({
	memberName,
	memberEmail,
	memberPassword,
	memberConfirmPassword,
	memberType,
}: {
	memberName: string;
	memberEmail: string;
	memberPassword: string;
	memberConfirmPassword: string;
	memberType: 'USER' | 'DEALER';
}): Promise<{ jwtToken: string }> => {
	const apolloClient = await initializeApollo();

	try {
		const result = await apolloClient.mutate({
			mutation: SIGN_UP,
			variables: {
				input: { memberName, memberEmail, memberPassword, memberConfirmPassword, memberType },
			},
			fetchPolicy: 'network-only',
		});

		const accessToken = result?.data?.signup?.accessToken;
		if (!accessToken) {
			const msg = (result as any)?.errors?.[0]?.message ?? '';
			if (msg) await sweetMixinErrorAlert(msg || 'Sign up failed');
			throw new Error('token error');
		}
		return { jwtToken: accessToken };
	} catch (err: any) {
		if (err?.message === 'token error') throw err;
		const msg = err?.graphQLErrors?.[0]?.message ?? err?.networkError?.message ?? err?.message ?? '';
		if (msg.includes('memberConfirmPassword must match memberPassword')) {
			await sweetMixinErrorAlert('Password and confirmation must match');
		} else if (msg.includes('Already used member nick or phone')) {
			await sweetMixinErrorAlert('This name or email is already taken');
		} else {
			await sweetMixinErrorAlert(msg || 'Sign up failed');
		}
		throw new Error('token error');
	}
};

export const updateStorage = ({ jwtToken }: { jwtToken: any }) => {
	setJwtToken(jwtToken);
};

function toId(value: any): string {
	if (value == null) return '';
	if (typeof value === 'string') return value;
	if (typeof value === 'object' && value?.toString) return value.toString();
	return String(value);
}

export const updateUserInfo = (jwtToken: any) => {
	if (!jwtToken) return false;

	let claims: any;
	try {
		claims = decodeJWT<CustomJwtPayload>(jwtToken);
	} catch {
		// Token format unexpected – set minimal state so header shows logged in
		userVar({
			_id: '1',
			memberType: '',
			memberStatus: '',
			memberAuthType: '',
			memberName: '',
			memberEmail: '',
			memberPhone: '',
			memberPhoto: '/img/profile/defaultUser.svg',
			memberNick: '',
			memberFullName: '',
			memberImage: '',
			memberAddress: '',
			memberDesc: '',
			memberWatches: 0,
			memberRank: 0,
			memberArticles: 0,
			memberPoints: 0,
			memberLikes: 0,
			memberViews: 0,
			memberWarnings: 0,
			memberBlocks: 0,
		});
		return false;
	}

	const photo = claims.memberPhoto ?? claims.memberImage ?? null;
	const id = toId(claims._id ?? (claims as any).sub ?? (claims as any).id);
	const num = (v: any) => (typeof v === 'number' && !Number.isNaN(v) ? v : 0);
	userVar({
		_id: id,
		memberType: claims.memberType ?? '',
		memberStatus: claims.memberStatus ?? '',
		memberAuthType: claims.memberAuthType,
		memberName: claims.memberName ?? claims.memberNick ?? '',
		memberEmail: claims.memberEmail ?? '',
		memberPhone: claims.memberPhone ?? '',
		memberPhoto: photo === null || photo === undefined ? '/img/profile/defaultUser.svg' : `${photo}`,
		memberNick: claims.memberNick ?? '',
		memberFullName: claims.memberFullName ?? '',
		memberImage: claims.memberImage ?? '',
		memberAddress: claims.memberAddress ?? '',
		memberDesc: claims.memberDesc ?? '',
		memberWatches: num(claims.memberWatches),
		memberRank: num(claims.memberRank),
		memberArticles: num(claims.memberArticles),
		memberPoints: num(claims.memberPoints),
		memberLikes: num(claims.memberLikes),
		memberViews: num(claims.memberViews),
		memberWarnings: num(claims.memberWarnings),
		memberBlocks: num(claims.memberBlocks),
	});
	return true;
};

export const logOut = () => {
	deleteStorage();
	deleteUserInfo();
	window.location.href = '/';
};

const deleteStorage = () => {
	localStorage.removeItem('accessToken');
	window.localStorage.setItem('logout', Date.now().toString());
};

const deleteUserInfo = () => {
	userVar({
		_id: '',
		memberType: '',
		memberStatus: '',
		memberAuthType: '',
		memberName: '',
		memberEmail: '',
		memberPhone: '',
		memberPhoto: '',
		memberNick: '',
		memberFullName: '',
		memberImage: '',
		memberAddress: '',
		memberDesc: '',
		memberWatches: 0,
		memberRank: 0,
		memberArticles: 0,
		memberPoints: 0,
		memberLikes: 0,
		memberViews: 0,
		memberWarnings: 0,
		memberBlocks: 0,
	});
};


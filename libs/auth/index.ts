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
		const { jwtToken, member } = await requestJwtToken({ memberName, password });

		if (jwtToken) {
			updateStorage({ jwtToken });
			updateUserInfo(jwtToken, member);
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
}): Promise<{ jwtToken: string; member?: any }> => {
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
		return { jwtToken: accessToken, member: loginData };
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
		const { jwtToken, member } = await requestSignUpJwtToken({
			memberName,
			memberEmail,
			memberPassword,
			memberConfirmPassword,
			memberType,
		});

		if (jwtToken) {
			updateStorage({ jwtToken });
			updateUserInfo(jwtToken, member);
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
}): Promise<{ jwtToken: string; member?: any }> => {
	const apolloClient = await initializeApollo();

	try {
		const result = await apolloClient.mutate({
			mutation: SIGN_UP,
			variables: {
				input: { memberName, memberEmail, memberPassword, memberConfirmPassword, memberType },
			},
			fetchPolicy: 'network-only',
		});

		const signupData = result?.data?.signup;
		const accessToken = signupData?.accessToken;
		if (!accessToken) {
			const msg = (result as any)?.errors?.[0]?.message ?? '';
			if (msg) await sweetMixinErrorAlert(msg || 'Sign up failed');
			throw new Error('token error');
		}
		return { jwtToken: accessToken, member: signupData };
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
	if (typeof value === 'object' && (value as any).$oid) return String((value as any).$oid);
	if (typeof value === 'object' && value?.toString && value.toString !== Object.prototype.toString) return value.toString();
	return String(value);
}

export const updateUserInfo = (jwtToken: any, memberFromApi?: any) => {
	if (!jwtToken) return false;

	let claims: any;
	try {
		claims = decodeJWT<CustomJwtPayload>(jwtToken);
	} catch {
		let payload: any = {};
		try {
			const parts = String(jwtToken).split('.');
			if (parts.length === 3 && typeof atob !== 'undefined') {
				payload = JSON.parse(atob(parts[1]));
			}
		} catch {
			// ignore
		}
		const fallbackId = toId(payload._id ?? payload.sub ?? payload.id);
		const fallbackType = payload.memberType ?? '';
		userVar({
			_id: fallbackId,
			memberType: fallbackType,
			memberStatus: payload.memberStatus ?? '',
			memberAuthType: payload.memberAuthType ?? '',
			memberName: payload.memberName ?? payload.memberNick ?? '',
			memberEmail: payload.memberEmail ?? '',
			memberPhone: payload.memberPhone ?? '',
			memberPhoto: payload.memberPhoto ?? payload.memberImage ?? '/img/profile/defaultUser.svg',
			memberNick: '',
			memberFullName: '',
			memberImage: '',
			memberAddress: payload.memberAddress ?? '',
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
		return !!fallbackId;
	}

	const num = (v: any) => (typeof v === 'number' && !Number.isNaN(v) ? v : 0);
	const m = memberFromApi;
	let existing: CustomJwtPayload | null = null;
	try {
		const cur = (userVar as unknown as (v?: CustomJwtPayload) => CustomJwtPayload)();
		if (cur && (cur as CustomJwtPayload)._id) existing = cur as CustomJwtPayload;
	} catch {
		// ignore
	}

	const id = toId(m?._id ?? claims._id ?? (claims as any).sub ?? (claims as any).id);
	const photo = m?.memberPhoto ?? m?.memberImage ?? claims.memberPhoto ?? claims.memberImage ?? existing?.memberPhoto ?? null;
	userVar({
		_id: id,
		memberType: m?.memberType ?? claims.memberType ?? existing?.memberType ?? '',
		memberStatus: m?.memberStatus ?? claims.memberStatus ?? existing?.memberStatus ?? '',
		memberAuthType: m?.memberAuthType ?? claims.memberAuthType ?? existing?.memberAuthType ?? '',
		memberName: m?.memberName ?? claims.memberName ?? claims.memberNick ?? existing?.memberName ?? '',
		memberEmail: m?.memberEmail ?? claims.memberEmail ?? existing?.memberEmail ?? '',
		memberPhone: m?.memberPhone ?? claims.memberPhone ?? existing?.memberPhone ?? '',
		memberPhoto: photo === null || photo === undefined ? (existing?.memberPhoto || '/img/profile/defaultUser.svg') : `${photo}`,
		memberNick: m?.memberNick ?? claims.memberNick ?? existing?.memberNick ?? '',
		memberFullName: m?.memberFullName ?? claims.memberFullName ?? existing?.memberFullName ?? '',
		memberImage: m?.memberImage ?? claims.memberImage ?? existing?.memberImage ?? '',
		memberAddress: m?.memberAddress ?? claims.memberAddress ?? existing?.memberAddress ?? '',
		memberDesc: m?.memberDesc ?? claims.memberDesc ?? existing?.memberDesc ?? '',
		memberWatches: num(m?.memberWatches ?? claims.memberWatches ?? existing?.memberWatches),
		memberRank: num(m?.memberRank ?? claims.memberRank ?? existing?.memberRank),
		memberArticles: num(m?.memberArticles ?? claims.memberArticles ?? existing?.memberArticles),
		memberPoints: num(m?.memberPoints ?? claims.memberPoints ?? existing?.memberPoints),
		memberLikes: num(m?.memberLikes ?? claims.memberLikes ?? existing?.memberLikes),
		memberViews: num(m?.memberViews ?? claims.memberViews ?? existing?.memberViews),
		memberWarnings: num(m?.memberWarnings ?? claims.memberWarnings ?? existing?.memberWarnings),
		memberBlocks: num(m?.memberBlocks ?? claims.memberBlocks ?? existing?.memberBlocks),
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


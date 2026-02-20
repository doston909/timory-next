/**
 * Minimal token getter/setter for Apollo and other modules that must work on SSR.
 * Does not import auth (which pulls in sweetAlert, jwt-decode, etc.).
 */
export function getJwtToken(): string {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('accessToken') ?? '';
	}
	return '';
}

export function setJwtToken(token: string): void {
	if (typeof window !== 'undefined') {
		localStorage.setItem('accessToken', token);
	}
}

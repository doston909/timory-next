import { useMemo } from 'react';
import { ApolloClient, ApolloLink, InMemoryCache, from, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";
import { onError } from '@apollo/client/link/error';
import { getJwtToken } from '../libs/auth-token';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
let apolloClient: ApolloClient<NormalizedCacheObject>;

function getHeaders() {
	const headers = {} as HeadersInit;
	const token = getJwtToken();
	// @ts-ignore
	if (token) headers['Authorization'] = `Bearer ${token}`;
	return headers;
}

const tokenRefreshLink = new TokenRefreshLink({
	accessTokenField: 'accessToken',
	isTokenValidOrUndefined: async() => {
		return true;
	}, // @ts-ignore
	fetchAccessToken: () => {
		// execute refresh token
		return null;
	},
});

function createIsomorphicLink() {
	const uri = process.env.NEXT_PUBLIC_API_GRAPHQL_URL || "http://localhost:3000/graphql";
	
	// Server-side uchun oddiy HTTP link
	if (typeof window === 'undefined') {
		const httpLink = createHttpLink({
			uri,
		});
		
		const authLink = new ApolloLink((operation, forward) => {
			operation.setContext(({ headers = {} }) => ({
				headers: {
					...headers,
					...getHeaders(),
				},
			}));
			return forward(operation);
		});

		const errorLink = onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.map(({ message, locations, path }) => {
					console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
				});
			}
			if (networkError) console.log(`[Network error]: ${networkError}`);
		});

		return from([errorLink, authLink.concat(httpLink)]);
	}

	// Client-side uchun to'liq link (upload, websocket bilan)
	const authLink = new ApolloLink((operation, forward) => {
		operation.setContext(({ headers = {} }) => ({
			headers: {
				...headers,
				...getHeaders(),
			},
		}));
		console.warn('requesting.. ', operation);
		return forward(operation);
	});

	const link = createUploadLink({
		uri,
	});

	const errorLink = onError(({ graphQLErrors, networkError, response }) => {
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path, extensions }) => {
				console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
				if (!message.includes('input') && typeof window !== 'undefined') {
					import('../libs/sweetAlert').then(({ sweetErrorAlert }) => sweetErrorAlert(message));
				}
			});
		}
		if (networkError) console.log(`[Network error]: ${networkError}`);
		// @ts-ignore
		if (networkError?.statusCode === 401) {
		}
	});

	return from([errorLink, tokenRefreshLink, authLink.concat(link)]);
}

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: createIsomorphicLink(),
	cache: new InMemoryCache(),
	resolvers: {},
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();
	if (initialState) _apolloClient.cache.restore(initialState);
	if (typeof window === 'undefined') return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function useApollo(initialState: any) {
	return useMemo(() => initializeApollo(initialState), [initialState]);
}

/**
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// No Subscription required for develop process

const httpLink = createHttpLink({
  uri: "http://localhost:3007/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
*/

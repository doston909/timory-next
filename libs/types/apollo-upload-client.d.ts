  declare module 'apollo-upload-client' {
     import { ApolloLink } from '@apollo/client';

     export interface UploadLinkOptions {
       uri?: string;
       fetch?: typeof fetch;
       headers?: Record<string, string>;
       credentials?: RequestCredentials;
       fetchOptions?: RequestInit;
     }

     export function createUploadLink(
       options?: UploadLinkOptions
     ): ApolloLink;
   }
import type { LogtoClient, UserInfoResponse } from '@logto/sveltekit';
import type { UserDoc } from '$lib/server/models';

declare global {
    namespace App {
        interface Locals {
            logtoClient: LogtoClient;
            user?: UserInfoResponse;
            dbUser?: UserDoc;
            theme: string;
        }
    }
}

export {};

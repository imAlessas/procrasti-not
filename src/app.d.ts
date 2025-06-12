import type { LogtoClient, UserInfoResponse } from '@logto/sveltekit';

declare global {
    namespace App {
        interface Locals {
            logtoClient: LogtoClient;
            authUser?: UserInfoResponse;
        }
    }
}
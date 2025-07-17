import { retrieveTheme, Theme } from '$lib/utils/theme';
import { writable, type Writable } from 'svelte/store';

export const theme : Writable<Theme> = writable( retrieveTheme() );

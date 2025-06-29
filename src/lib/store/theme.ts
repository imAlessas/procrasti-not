import { retrieveSystemTheme } from '$lib/utils/const';
import { writable } from 'svelte/store';

export const theme : any = writable( retrieveSystemTheme() );

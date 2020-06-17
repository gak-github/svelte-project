import { writable } from 'svelte/store';

const store = writable(
    {
        transactions: []
    }
);

export default store; 
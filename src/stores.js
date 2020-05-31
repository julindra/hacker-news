import { readable, writable, derived } from 'svelte/store';
import axios from 'axios';

export const
	types = readable(['newest', 'show', 'ask', 'jobs']),
	target = writable({ type: null, page: 1 }),
	current = writable(null),
	base = readable('https://api.hackerwebapp.com'),
	data = derived([base, target], ([$base, $target], set) => {
		if ($target.type) {
			const url = `${$base}/${$target.type}?page=${$target.page}`;
			$target.type = null;
			set(axios.get(url));
		}
	});
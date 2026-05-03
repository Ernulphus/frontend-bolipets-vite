import axios from 'axios';
import type { Pet } from '../components/PetCard/PetCard';

const methods: { [key: string]: string } = {
	CREATE: 'create',
	READ: 'read',
	UPDATE: 'update',
	DELETE: 'delete',

	FORM: 'form',

	GET: 'get',
	POST: 'post',
	PUT: 'put',

	DISOWN: 'disown',
	ADOPT: 'adopt',
	FEED: 'feed',
};

const epGroups: { [key: string]: string } = {
	PETS: 'Pets',
	USERS: 'Users',
};

const BACKEND_URL =
	import.meta.env.VITE_PUBLIC_URL_PRE || 'https://bolipets.pythonanywhere.com';
const AUTH0_AUDIENCE =
	import.meta.env.VITE_APP_AUTH0_AUDIENCE || 'https://bolipets/';

function getURL(
	group: string,
	method: string,
	subgroup?: string | null,
	queryObj?: object | null,
) {
	if (!BACKEND_URL) throw new Error('No base URL');
	if (!Object.values(epGroups).includes(group))
		throw new Error('Endpoint group not found');
	if (!Object.values(methods).includes(method))
		throw new Error('Invalid method');
	const queryString = queryObj ? queryObjToString(queryObj) : '';
	if (subgroup && !Object.values(methods).includes(subgroup))
		throw new Error('Endpoint subgroup not found');
	const subgroupString = subgroup ? `${subgroup}/` : '';
	const url = `${BACKEND_URL}/${group}/${subgroupString}${method}${queryString}`;
	return url;
}

function queryObjToString(queryObj: object | null) {
	if (!queryObj) return '';
	let queryString = '?';
	Object.entries(queryObj).forEach((key, value) => {
		queryString += `${key}=${value.toString()}&`;
	});
	return queryString;
}

const petsCreateURL = getURL(epGroups.PETS, methods.CREATE);

const petsCreate = (formData: Pet, token: string) => {
	return new Promise((resolve, reject) => {
		axios
			.post(petsCreateURL, formData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${token}`,
				},
			})
			.then(resolve)
			.catch(reject);
	});
};

const petsRead = (token: string | null) => {
	return new Promise((resolve, reject) => {
		axios
			.get(getURL(epGroups.PETS, methods.READ), {
				headers: { Authorization: `${token}` },
			})
			.then(({ data }) => resolve(data))
			.catch(reject);
	});
};

const petRead = (token: string | null, id: string | undefined) => {
	const url = `${getURL(epGroups.PETS, methods.READ)}?id=${id}`;
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				headers: { Authorization: `${token}` },
			})
			.then(({ data }) => resolve(data))
			.catch(reject);
	});
};

const petsForm = () => {
	const url = getURL(epGroups.PETS, methods.FORM);
	return new Promise((resolve, reject) => {
		axios
			.get(url)
			.then(({ data }) => resolve(data))
			.catch(reject);
	});
};

const petsDelete = (_id: string) => {
	return new Promise((resolve, reject) => {
		axios.delete(`${epGroups.PETS}/${_id}`).then(resolve).catch(reject);
	});
};

const petDisownURL = getURL(epGroups.PETS, methods.DISOWN);

const petDisown = (token: string | null, id: string) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				petDisownURL,
				{ id: id },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${token}`,
					},
				},
			)
			.then(resolve)
			.catch(reject);
	});
};

const petAdopteeRead = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(getURL(epGroups.PETS, methods.READ, methods.DISOWN))
			.then(({ data }) => resolve(data))
			.catch(reject);
	});
};

const petAdopt = (token: string | null, id: string) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				getURL(epGroups.PETS, methods.ADOPT),
				{ id: id },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${token}`,
					},
				},
			)
			.then(resolve)
			.catch(reject);
	});
};

const petFeed = (token: string | null, id: string) => {
	return new Promise((resolve, reject) => {
		axios
			.post(
				getURL(epGroups.PETS, methods.FEED),
				{ id: id },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${token}`,
					},
				},
			)
			.then(resolve)
			.catch(reject);
	});
};

export {
	AUTH0_AUDIENCE,
	epGroups,
	getURL,
	methods,
	petsCreate,
	petRead,
	petsRead,
	petsForm,
	petsDelete,
	petAdopt,
	petDisown,
	petAdopteeRead,
	petFeed,
};

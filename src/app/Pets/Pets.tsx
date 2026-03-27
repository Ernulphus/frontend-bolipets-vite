import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Pet } from '../components/PetCard/PetCard';
import PetList from '../components/PetList/PetList';
import { AUTH0_AUDIENCE, petsRead } from '../utils/networkutils';

interface petObject {
	[key: string]: Pet;
}

function petsObjectToArray(Data: petObject) {
	const keys = Object.keys(Data);
	const pets = keys.map((key) => Data[key]);
	return pets;
}

export default function Pets() {
	const [error, setError] = useState('');
	const [pets, setPets] = useState([] as Pet[]);
	const [token, setToken] = useState('');
	const [loaded, setLoaded] = useState(false);
	const { getAccessTokenSilently } = useAuth0();

	const fetchPets = useCallback((token: string) => {
		petsRead(token)
			.then((data) => {
				setPets(petsObjectToArray(data as petObject));
				setLoaded(true);
			})
			.catch((error: string) =>
				setError(`There was a problem retrieving your pets. ${error}`),
			);
	}, []);

	useEffect(() => {
		getAccessTokenSilently({
			authorizationParams: {
				audience: AUTH0_AUDIENCE,
				scope: 'profile email read:pets',
			},
		})
			.then((userData) => {
				fetchPets(userData);
				setToken(userData);
			})
			.catch((error: string) =>
				setError(`There was a problem authorizing you. ${error}`),
			);
	}, [getAccessTokenSilently, fetchPets]);

	return (
		<div className="wrapper">
			<header>
				<h1>View All Pets</h1>
				<Link to="/CreatePet">
					<button type="button">Add a Pet</button>
				</Link>
			</header>
			<PetList
				error={error}
				pets={pets}
				loaded={loaded}
				fetchPets={fetchPets}
				token={token}
			/>
		</div>
	);
}

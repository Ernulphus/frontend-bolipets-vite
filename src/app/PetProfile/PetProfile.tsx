import './PetProfile.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import type { Pet } from '../components/PetCard/PetCard';
import type { petObject } from '../Pets/Pets';
import { petsObjectToArray } from '../Pets/Pets';
import { AUTH0_AUDIENCE, petsRead } from '../utils/networkutils';

export default function PetProfile() {
	const [error, setError] = useState('');
	const [pet, setPet] = useState<Pet>();
	const [token, setToken] = useState('');
	const [loaded, setLoaded] = useState(false);
	const { id } = useParams();
	const { getAccessTokenSilently } = useAuth0();

	const fetchPets = useCallback(
		(token: string) => {
			petsRead(token)
				.then((data) => {
					const pets = petsObjectToArray(data as petObject);
					const petsFiltered = pets.filter((pet) => pet._id === id);
					if (petsFiltered.length) {
						setPet(petsFiltered[0]);
					} else {
						setError('Pet not found.');
					}

					setLoaded(true);
				})
				.catch((error: string) =>
					setError(`There was a problem retrieving your pet. ${error}`),
				);
		},
		[id],
	);

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

	if (error) return <ErrorMessage message={error} />;
	if (!loaded) return <p>Loading pets...</p>;
	if (!pet) return <h2>Pet not found.</h2>;
	return (
		<div className="wrapper">
			<header>
				<h1>{pet.Name}</h1>
			</header>
		</div>
	);
}

import './PetProfile.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import DisownAdoptButton from '../components/PetCard/DisownAdoptButton';
import type { Pet } from '../components/PetCard/PetCard';
import PetPreview from '../components/PetPreview/PetPreview';
import type { petObject } from '../Pets/Pets';
import { petsObjectToArray } from '../Pets/Pets';
import { AUTH0_AUDIENCE, petRead } from '../utils/networkutils';

export default function PetProfile() {
	const [error, setError] = useState('');
	const [pet, setPet] = useState<Pet>();
	const [token, setToken] = useState('');
	const [loaded, setLoaded] = useState(false);
	const { id } = useParams();
	const { getAccessTokenSilently } = useAuth0();

	const fetchPet = useCallback(
		(token: string) => {
			petRead(token, id)
				.then((data) => {
					const pets = petsObjectToArray(data as petObject);
					console.log(id, data)
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
				fetchPet(userData);
				setToken(userData);
			})
			.catch((error: string) =>
				setError(`There was a problem authorizing you. ${error}`),
			);
	}, [getAccessTokenSilently, fetchPet]);

	const petNotFoundError = 'Pet not found.';
	if (error) return <ErrorMessage message={error} />;
	if (!loaded) return <p>Loading pets...</p>;
	if (!pet) return <ErrorMessage message={petNotFoundError} />;
	if (!id) return <ErrorMessage message={petNotFoundError} />;
	return (
		<div className="wrapper">
			<header>
				<h1>{pet.Name}</h1>
			</header>
			<PetPreview pet={pet} />
			<DisownAdoptButton
				token={token}
				id={id}
				fetchPets={fetchPet}
				disownMode={true}
			/>
		</div>
	);
}

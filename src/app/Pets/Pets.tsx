import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import PetPreview from '../components/PetPreview/PetPreview';
import { pet_images } from '../constants';
import { AUTH0_AUDIENCE, petsRead } from '../utils/networkutils';
import style from './Pets.module.css';

function ErrorMessage(props: ErrorMessageProps) {
	const { message } = props;
	return <div className="error-message">{message}</div>;
}
interface ErrorMessageProps {
	message: string;
}

function Pet(props: PetProps) {
	const { petKey: key, pet } = props;
	const { Name } = pet;
	const dispFields: (keyof Pet)[] = ['color', 'mood', 'species'];
	const petSpecies = pet.species;
	return (
		<div key={key} className={style.pet_container}>
			{pet.species in pet_images && (
				<PetPreview color={pet.color} pet={petSpecies} />
			)}
			<div>
				<h2>{Name}</h2>
				{dispFields
					.filter((fld) => pet[fld])
					.map((fld) => {
						return (
							<p key={pet[fld]}>
								{fld}: {pet[fld]}
							</p>
						);
					})}
			</div>
		</div>
	);
}

export interface Pet {
	Name: string;
	color: string;
	mood: number;
	species: keyof typeof pet_images;
	_id: string;
}

function PetList(props: petDisplayListProps) {
	const { error, pets, loaded, fetchPets } = props;
	if (error) return <ErrorMessage message={error} />;
	if (!loaded) return <p>Loading pets...</p>;
	if (!pets.length)
		return (
			<div>
				<h2>No pets found.</h2>
				<Link to="/createPet">Adopt one now!</Link>
			</div>
		);

	return pets.map((pet) => (
		<Pet key={pet._id} petKey={pet._id} pet={pet} fetchPets={fetchPets} />
	));
}

interface petDisplayListProps {
	error: string;
	pets: Pet[];
	loaded: boolean;
	fetchPets: (token: string) => void;
}

interface PetProps {
	petKey?: string;
	pet: Pet;
	fetchPets: (token: string) => void;
}

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
			.then(fetchPets)
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
			/>
		</div>
	);
}

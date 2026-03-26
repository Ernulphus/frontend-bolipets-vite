import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import PetCard, { type Pet } from '../components/PetCard/PetCard';
import { AUTH0_AUDIENCE, petsRead } from '../utils/networkutils';

function ErrorMessage(props: ErrorMessageProps) {
	const { message } = props;
	return <div className="error-message">{message}</div>;
}
interface ErrorMessageProps {
	message: string;
}

function PetList(props: petDisplayListProps) {
	const { error, pets, loaded, fetchPets, token } = props;
	if (error) return <ErrorMessage message={error} />;
	if (!loaded) return <p>Loading pets...</p>;
	if (!pets.length)
		return (
			<div>
				<h2>No pets found.</h2>
				<Link to="/createPet">Create one</Link> or{' '}
				<Link to="/pound">adopt one now!</Link>
			</div>
		);

	return pets.map((pet) => (
		<PetCard
			key={pet._id}
			petKey={pet._id}
			pet={pet}
			fetchPets={fetchPets}
			token={token}
		/>
	));
}

interface petDisplayListProps {
	error: string;
	pets: Pet[];
	loaded: boolean;
	fetchPets: (token: string) => void;
	token: string;
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

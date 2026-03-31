import { Link } from 'react-router';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import type { Pet } from '../PetCard/PetCard';
import PetCard from '../PetCard/PetCard';

export default function PetList(props: petDisplayListProps) {
	const { error, pets, loaded, fetchPets, token, disownMode } = props;
	if (error) return <ErrorMessage message={error} />;
	if (!loaded) return <p>Loading pets...</p>;
	if (!pets.length)
		return (
			<div>
				<h2>No pets found.</h2>
				<Link to="/createPet">Create one</Link> or{' '}
				<Link to="/Shelter">adopt one now!</Link>
			</div>
		);

	return pets.map((pet) => (
		<PetCard
			key={pet._id}
			petKey={pet._id}
			pet={pet}
			fetchPets={fetchPets}
			token={token}
			disownMode={disownMode}
		/>
	));
}

interface petDisplayListProps {
	error: string;
	pets: Pet[];
	loaded: boolean;
	fetchPets: (token: string) => void;
	token: string;
	disownMode: boolean;
}

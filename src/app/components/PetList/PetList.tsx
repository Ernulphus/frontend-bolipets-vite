import { Link } from 'react-router';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PetCard from '../PetCard/PetCard';

export default function PetList(props: petDisplayListProps) {
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

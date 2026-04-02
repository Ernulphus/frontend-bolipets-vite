import './PetProfile.css';
import { useParams } from 'react-router';

export default function PetProfile() {
	const { id } = useParams();
	return <p>{id}</p>;
}

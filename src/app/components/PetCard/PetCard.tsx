import { Link } from 'react-router';
import { pet_images } from '../../constants';
import { PET } from '../../utils/routeutils';
import PetPreview from '../PetPreview/PetPreview';
import DisownAdoptButton from './DisownAdoptButton';
import style from './PetCard.module.css';

export default function PetCard(props: PetProps) {
	const { petKey: key, pet, token, fetchPets, disownMode } = props;
	const { Name, _id: id, username } = pet;
	const dispFields: (keyof Pet)[] = ['species', 'mood'];
	const petSpecies = pet.species;
	return (
		<Link to={`${PET}/${id}`}>
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
					<p>original owner: {username}</p>
					<DisownAdoptButton
						token={token}
						id={id}
						fetchPets={fetchPets}
						disownMode={disownMode}
					/>
				</div>
			</div>
		</Link>
	);
}

export interface Pet {
	Name: string;
	color: string;
	mood: number;
	species: keyof typeof pet_images;
	_id: string;
	username: string;
	email: string;
}

interface PetProps {
	petKey?: string;
	pet: Pet;
	fetchPets: (token: string) => void;
	token: string;
	disownMode: boolean;
}

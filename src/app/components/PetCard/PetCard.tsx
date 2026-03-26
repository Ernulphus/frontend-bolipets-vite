import { pet_images } from '../../constants';
import PetPreview from '../PetPreview/PetPreview';
import style from './PetCard.module.css';

export default function PetCard(props: PetProps) {
	const { petKey: key, pet, token, fetchPets } = props;
	const { Name, _id: id } = pet;
	const dispFields: (keyof Pet)[] = ['color', 'mood', 'species'];
	const petSpecies = pet.species;
	const disownPet = () => {
		petDisown(token, id).then(() => {
			fetchPets(token);
		});
	};
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
				<button type="button" onClick={disownPet}>
					Disown
				</button>
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

interface PetProps {
	petKey?: string;
	pet: Pet;
	fetchPets: (token: string) => void;
	token: string;
}

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import type { questionObj } from '../components/Form/Form';
import Form, { getQuestionValue } from '../components/Form/Form';
import type { Pet } from '../components/PetCard/PetCard';
import PetPreview from '../components/PetPreview/PetPreview';
import { pet_image_defaults, type pet_images } from '../constants';
import { AUTH0_AUDIENCE, petsCreate, petsForm } from '../utils/networkutils';
import './CreatePet.css';

export default function CreatePet() {
	const [form, setForm] = useState<[questionObj] | undefined>();
	const [submitted, setSubmitted] = useState(false);

	const { user, getAccessTokenSilently } = useAuth0();

	const CreatePetImages = {
		species: pet_image_defaults,
	};

	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: This formdata needs to stay open and flexible. Maybe look at later.
		petsForm().then((data) => setForm(data as any));
	}, []);

	if (!user) return;

	const submitPet = async () => {
		if (!form) return;
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: AUTH0_AUDIENCE,
				scope: 'openid profile email create:pets',
			},
		});

		const pet = Object.fromEntries(
			form.map((q) => [q.fld_nm, q.value]),
		) as unknown as Pet;
		pet.username = user.name || '';
		pet.email = user.email || '';
		petsCreate(pet, token)
			.then(() => setSubmitted(true))
			.catch(console.log);
	};
	const titleText = 'Your new Bolipet!';
	return (
		<div className="create-pet m-5 flex flex-col items-center">
			<div>
				<h1 className="text-6xl">{titleText}</h1>
				<div className="flex flex-row">
					<Form
						questions={form}
						onSubmit={submitPet}
						images={CreatePetImages}
						setForm={setForm}
					/>
					{submitted && <p>Pet created!</p>}
					<PetPreview
						color={getQuestionValue(form, 'color')}
						pet={getQuestionValue(form, 'species') as keyof typeof pet_images}
					/>
				</div>
			</div>
		</div>
	);
}

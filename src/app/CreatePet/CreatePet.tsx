import { petsCreate, petsForm, AUTH0_AUDIENCE } from '../utils/networkutils';
import { useState, useEffect } from 'react';
import Form, { getQuestionValue } from '../components/Form/Form';
import type { questionObj } from '../components/Form/Form';
import PetPreview from '../components/PetPreview/PetPreview';
import { useAuth0 } from '@auth0/auth0-react';

import { pet_images, pet_image_defaults } from '../constants';
import type { Pet } from '../Pets/Pets';

export default function CreatePet() {
  const [form, setForm] = useState<[questionObj] | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const { user, getAccessTokenSilently } = useAuth0();
  if (!user) return;

  const CreatePetImages = {
    'species': pet_image_defaults,
  }

  useEffect(() => {
    petsForm()
    .then((data) => setForm(data as any)); // eslint-disable-line @typescript-eslint/no-explicit-any
  }, []);

  
  const submitPet = async () => {
    if (!form) return;
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: AUTH0_AUDIENCE,
        scope: 'openid profile email create:pets',
      },
    })

    const pet = Object.fromEntries(
      form.map((q) => [q.fld_nm, q.value])
    ) as unknown as Pet;
    
    const newPet = {
      email: user.email,
      username: user.name,
      ...pet,
    };
    petsCreate(newPet, token)
      .then(() => setSubmitted(true))
      .catch(console.log);
  }
  const titleText = 'Your new Bolipet!'
  return (
    <div className="m-5 flex flex-col items-center">
      <div>
        <h1 className="text-6xl">{titleText}</h1>
        <div className="flex flex-row">
          <Form
            questions={form}
            onSubmit={submitPet}
            images={CreatePetImages}
            setForm={setForm}
          />
          {submitted && (<p>Pet created!</p>)}
          <PetPreview
            color={getQuestionValue(form, 'color')}
            pet={getQuestionValue(form, 'species') as keyof typeof pet_images} 
          />
        </div>
      </div>
    </div>
  )
}

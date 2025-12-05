import { petsCreate, petsForm } from '../utils/networkutils';
import { useState, useEffect } from 'react';
import Form, { getQuestionValue } from '../components/Form/Form';
import type { questionObj } from '../components/Form/Form';
import PetPreview from '../components/PetPreview/PetPreview';
import { useAuth0 } from '@auth0/auth0-react';

import { pet_images } from '../constants';

export default function CreatePet() {
  const [form, setForm] = useState<[questionObj] | undefined>();

  const { user } = useAuth0();
  if (!user) return;

  useEffect(() => {
    petsForm()
    .then((data) => setForm(data as any)); // eslint-disable-line @typescript-eslint/no-explicit-any
  }, []);
  
  const submitPet = (formData: FormData) => {
    const newPet = {
      email: user.email,
      name: user.name,
      ...formData,
    };
    petsCreate(newPet);
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
            images={pet_images}
            setForm={setForm}
          />
          <PetPreview
            color={getQuestionValue(form, 'color')}
            pet={getQuestionValue(form, 'species') as keyof typeof pet_images} 
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import { petsCreate, petsForm } from '@/app/utils/networkutils';
import React, { useState, useEffect } from 'react';
import Form, { questionObj, getQuestionValue } from '@/app/components/Form/Form';
import PetPreview from '@/app/components/PetPreview/PetPreview';
import { auth0 } from '@/lib/auth0';
import LoginSignup from '@/lib/LoginSignup';
import { SessionData } from '@auth0/nextjs-auth0/types';

import { pet_images } from '../constants';

export default function CreatePet() {
  const [form, setForm] = useState<[questionObj] | undefined>();
  const [session, setSession] = useState<SessionData | null>(null)

  useEffect(() => {
    auth0.getSession()
      .then(setSession);
    petsForm()
    .then((data) => setForm(data as any)); // eslint-disable-line @typescript-eslint/no-explicit-any
  }, []);
  
  if (!session) return (
    <LoginSignup />
  );
  
  const submitPet = (formData: FormData) => {
    const newPet = {
      email: session.user.email,
      name: session.user.name,
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

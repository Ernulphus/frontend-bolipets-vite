'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";

import style from './Pets.module.css';
 
import { petsRead } from '@/app/utils/networkutils';
import { pet_images } from '../constants';
import PetPreview from '../components/PetPreview/PetPreview';

import { auth0 } from '@/lib/auth0';
import LoginSignup from '@/lib/LoginSignup';
import { SessionData } from '@auth0/nextjs-auth0/types';

function ErrorMessage(props: ErrorMessageProps) {
  const { message } = props;
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
interface ErrorMessageProps {
  message: string,
}

function Pet(props: PetProps) {
  const {
    petKey: key,
    pet,
   } = props;
  const { Name, color, eye, hunger, mood, species } = pet;
  const petSpecies = species;
  return (
    <div key={key} className={style.pet_container} >
      {species in pet_images && 
        <PetPreview color={color} pet={petSpecies} />
      }
      <div>
        <h2>{Name}</h2>
        <p>
          Color: {color}
        </p>
        <p>
          Eye: {eye}
        </p>
        <p>
          Hunger: {hunger}
        </p>
        <p>
          Mood: {mood}
        </p>
      </div>
    </div>
  );
}

interface Pet {
  Name: string,
  color: string,
  eye: string,
  hunger: number
  mood: number,
  species: keyof typeof pet_images,
  _id: string,
}

interface PetProps {
  petKey?: string,
  pet: Pet,
  fetchPets: () => void,
}

interface petObject {
  [key: string]: Pet
}

function petsObjectToArray(Data: petObject) {
  const keys = Object.keys(Data);
  const pets = keys.map((key) => Data[key]);
  return pets;
}


export default function Pets() {
  const [error, setError] = useState('');
  const [pets, setPets] = useState([] as Pet[]);
  const [session, setSession] = useState<SessionData | null>(null)
  
  const fetchPets = () => {
    petsRead(session)
    .then(
      (data) => { setPets(petsObjectToArray(data as petObject)) }
    )
    .catch((error: string) => setError(`There was a problem retrieving the list of people. ${error}`));
  };
  
  useEffect(() => {
    auth0.getSession()
      .then(setSession);
    fetchPets()
  }, [session]);

  if (session) {console.log(session.accessTokens)}

  if (!session) return (
    <LoginSignup />
  );


  return (
    <div className="wrapper">
      <header>
        <h1>
          View All Pets
        </h1>
        <Link href="CreatePet">
          <button type="button">
            Add a Pet
          </button>
        </Link>
      </header>
      {error && <ErrorMessage message={error} />}
      {
      pets.map((pet) => 
        (<Pet
          key={pet['_id']}
          petKey={pet['_id']}
          pet={pet}
          fetchPets={fetchPets}
        />)
      )
      }
    </div>
  );
}

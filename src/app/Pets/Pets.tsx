import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import style from './Pets.module.css';
 
import { epGroups, methods, getURL, petsRead } from '../utils/networkutils';
import { pet_images } from '../constants';
import PetPreview from '../components/PetPreview/PetPreview';

import { useAuth0 } from '@auth0/auth0-react';

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
  const { getAccessTokenSilently } = useAuth0();

  const fetchPets = (token: string) => {
    petsRead(token)
    .then(
      (data) => { setPets(petsObjectToArray(data as petObject)) }
    )
    .catch((error: string) => setError(`There was a problem retrieving the list of people. ${error}`));
  };
  
  useEffect(() => {
    getAccessTokenSilently({
      authorizationParams: {
        audience: getURL(epGroups.PETS, methods.READ),
        scope: 'read:pets',
      },
    })
      .then(fetchPets)
  }, []);

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

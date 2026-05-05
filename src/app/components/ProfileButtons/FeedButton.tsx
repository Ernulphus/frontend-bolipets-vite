import { useState } from 'react';
import { petFeed } from '../../utils/networkutils';

interface DisownAdoptButtonProps {
  token: string;
  id: string;
  fetchPets: (token: string) => void;
  disownMode: boolean;
}

export default function FeedButton(props: DisownAdoptButtonProps) {
  const { token, id, fetchPets } = props;
  const [notif, setNotif] = useState<string | undefined>();

  const feedPet = () => {
    petFeed(token, id).then(() => {
      fetchPets(token);
    })
      .then(() => setNotif('Pet adopted!'))
      .catch((error) => setNotif(`Error: ${error}`));;
  };

  return (
    <>
      <button type="button" onClick={feedPet}>
        Feed
      </button>
      {notif && <p>{notif}</p>}
    </>
  );
}

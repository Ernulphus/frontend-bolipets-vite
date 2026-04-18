import { useState } from 'react';
import { petAdopt, petDisown } from '../../utils/networkutils';

interface DisownAdoptButtonProps {
	token: string;
	id: string;
	fetchPets: (token: string) => void;
	disownMode: boolean;
}

export default function DisownAdoptButton(props: DisownAdoptButtonProps) {
	const { token, id, fetchPets, disownMode } = props;
	const [notif, setNotif] = useState<string | undefined>();
	const disownPet = () => {
		petDisown(token, id).then(() => {
			fetchPets(token);
		})
			.then(() => setNotif('Pet sent to the pound.'))
			.catch((error) => setNotif(`Error: ${error}`));
	};
	const adoptPet = () => {
		petAdopt(token, id).then(() => {
			fetchPets(token);
		})
			.then(() => setNotif('Pet adopted!'))
			.catch((error) => setNotif(`Error: ${error}`));;
	};

	return (
		<>
			{
				disownMode ?
					<button type="button" onClick={disownPet}>
						Disown
					</button>

					: <button type="button" onClick={adoptPet}>
						Adopt
					</button>
			}
			{notif && <p>{notif}</p>}
		</>
	);
}

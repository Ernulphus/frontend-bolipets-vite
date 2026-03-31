import { petAdopt, petDisown } from '../../utils/networkutils';

interface DisownAdoptButtonProps {
	token: string;
	id: string;
	fetchPets: (token: string) => void;
	disownMode: boolean;
}

export default function DisownAdoptButton(props: DisownAdoptButtonProps) {
	const { token, id, fetchPets, disownMode } = props;
	const disownPet = () => {
		petDisown(token, id).then(() => {
			fetchPets(token);
		});
	};
	const adoptPet = () => {
		petAdopt(token, id).then(() => {
			fetchPets(token);
		});
	};
	if (disownMode)
		return (
			<button type="button" onClick={disownPet}>
				Disown
			</button>
		);
	else
		return (
			<button type="button" onClick={adoptPet}>
				Adopt
			</button>
		);
}

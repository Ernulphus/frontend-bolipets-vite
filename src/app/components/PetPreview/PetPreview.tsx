import { pet_images } from '../../constants';
import type { Pet, PetAppearance } from '../PetCard/PetCard';
import styles from './PetPreview.module.css';

interface PetPreviewProps {
	pet: Pet | PetAppearance;
}

export default function PetPreview({ pet }: PetPreviewProps) {
	const { color, species } = pet;
	console.log(species);
	const defaultImageURL = `url('/PetImages/${species}/${species}.png')`;
	if (!species) return;
	return (
		<div className={styles.pet_preview}>
			<div
				style={{
					backgroundColor: color,
					maskImage: defaultImageURL,
					WebkitMaskImage: defaultImageURL,
				}}
			/>
			<img alt={species} src={pet_images[species].TRANSPARENT} />
		</div>
	);
}

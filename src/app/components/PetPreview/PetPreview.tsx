import React from 'react';
import styles from './PetPreview.module.css';
import { pet_images } from '@/app/constants';

type petImages = typeof pet_images;

interface PetPreviewProps <K extends keyof petImages> {
  color: string | undefined,
  pet: K | undefined,
}


export default function PetPreview<K extends keyof petImages>({color, pet}: PetPreviewProps<K>) {
  const defaultImageURL = `url('/PetImages/${pet}/${pet}.png')`
  if (!pet) return;
  return (
    <div className={styles.pet_preview}>
      <div style={{
        backgroundColor: color,
        maskImage: defaultImageURL,
        WebkitMaskImage: defaultImageURL,
      }}/>
      <img
        src={pet_images[pet].TRANSPARENT.src}
      />
    </div>
  )
}
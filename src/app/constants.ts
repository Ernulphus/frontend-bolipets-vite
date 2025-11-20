import Arakran from './components/PetImages/arakran/arakran.png';
import Arakran_ from './components/PetImages/arakran/arakran_transparent.png';
import Esquardo from './components/PetImages/esquardo/esquardo.png';
import Esquardo_ from './components/PetImages/esquardo/esquardo_transparent.png';
import Pomar from './components/PetImages/pomar/pomar.png';
import Pomar_ from './components/PetImages/pomar/pomar_transparent.png';
import Zugzwang from './components/PetImages/zugzwang/zugzwang.png';
import Zugzwang_ from './components/PetImages/zugzwang/zugzwang_transparent.png';

// const DEFAULT = 'default';
// const TRANSPARENT = 'transparent';

const pet_images = {
  'arakran': {
    DEFAULT: Arakran,
    TRANSPARENT: Arakran_,
  },
  'esquardo': {
    DEFAULT: Esquardo,
    TRANSPARENT: Esquardo_,
  },
  'pomar': {
    DEFAULT: Pomar,
    TRANSPARENT: Pomar_,
  },
  'zugzwang': {
    DEFAULT: Zugzwang,
    TRANSPARENT: Zugzwang_,
  }
} as const;

export {
  pet_images,
}
import Arakran from '/PetImages/arakran/arakran.png';
import Arakran_ from '/PetImages/arakran/arakran_transparent.png';
import Esquardo from '/PetImages/esquardo/esquardo.png';
import Esquardo_ from '/PetImages/esquardo/esquardo_transparent.png';
import Pomar from '/PetImages/pomar/pomar.png';
import Pomar_ from '/PetImages/pomar/pomar_transparent.png';
import Zugzwang from '/PetImages/zugzwang/zugzwang.png';
import Zugzwang_ from '/PetImages/zugzwang/zugzwang_transparent.png';

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

const pet_image_defaults = {
  arakran: Arakran,
  esquardo: Esquardo,
  pomar: Pomar,
  zugzwang: Zugzwang,
};

export {
  pet_images,
  pet_image_defaults,
}
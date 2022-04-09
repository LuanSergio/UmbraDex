import {
  pokemonArtworkImages,
  pokemonArtworkUploadedQuantity,
} from '@data/imagesRoutes';
import extraFormAvailableImages from '@data/extraFormAvailableImages';

export default function getPokemonImageUrl(id: number): string {
  return pokemonArtworkUploadedQuantity >= id ||
    extraFormAvailableImages.includes(id)
    ? `${pokemonArtworkImages.main}/${id}.png`
    : `${pokemonArtworkImages.fallback}/${id}.png`;
}

import {
  pokemonArtworkImages,
  pokemonArtworkUploadedQuantity,
} from 'src/constants/imagesRoutes';
import extraFormAvailableImages from 'src/constants/extraFormAvailableImages';

export default function getPokemonImageUrl(id: number): string {
  return pokemonArtworkUploadedQuantity >= id ||
    extraFormAvailableImages.includes(id)
    ? `${pokemonArtworkImages.main}/${id}.png`
    : `${pokemonArtworkImages.fallback}/${id}.png`;
}

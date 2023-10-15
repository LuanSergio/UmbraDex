import {
  pokemonArtworkImages,
  pokemonArtworkUploadedQuantity,
} from 'src/constants/imagesRoutes';
import extraFormAvailableImages from 'src/constants/extraFormAvailableImages';

export default function getPokemonImageUrl(
  id: number,
  isShiny = false,
): string {
  if (!isShiny) {
    return pokemonArtworkUploadedQuantity >= id ||
      extraFormAvailableImages.includes(id)
      ? `${pokemonArtworkImages.main}/${id}.webp`
      : `${pokemonArtworkImages.fallback}/${id}.png`;
  }

  return pokemonArtworkUploadedQuantity >= id ||
    extraFormAvailableImages.includes(id)
    ? `${pokemonArtworkImages.mainShiny}/${id}.png`
    : `${pokemonArtworkImages.fallbackShiny}/${id}.png`;
}

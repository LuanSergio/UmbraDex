declare interface PokemonDescription {
  description: string;
  gameVersion: number;
}

declare interface PokemonEvolution {
  id: number;
  name: string;
  order: number;
}

declare interface PokemonStats {
  name: string;
  value: number;
}

declare interface IPokemonDetails {
  id: number;
  name: string;
  types: string[];
  japaneseName: string;
  image: string;
  descriptions: PokemonDescription[];
  evolutionChain: PokemonEvolution[];
  stats: PokemonStats;
}

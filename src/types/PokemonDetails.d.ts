declare interface PokemonDescription {
  id: string;
  description: string;
  gameVersion: number;
}

declare interface PokemonEvolution {
  id: number;
  name: string;
  order: number;
}

declare interface IPokemonDetails {
  japaneseName: string;
  descriptions: PokemonDescription[];
  evolutionChain: PokemonEvolution[];
}

declare interface IPokemonVariantDetails {
  forms: PokemonForm[];
  japaneseName: string;
  descriptions: PokemonDescription[];
  evolutionChain: PokemonEvolution[];
}

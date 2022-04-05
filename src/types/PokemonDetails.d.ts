declare interface IPokemonDescription {
  id: string;
  description: string;
  gameVersion: number;
}

declare interface IPokemonEvolution {
  id: number;
  name: string;
  order: number;
}

declare interface IPokemonDetails {
  japaneseName: string;
  descriptions: IPokemonDescription[];
  evolutionChain: IPokemonEvolution[];
}

declare interface IPokemonVariantDetails {
  forms: IPokemonForm[];
  japaneseName: string;
  descriptions: IPokemonDescription[];
  evolutionChain: IPokemonEvolution[];
}

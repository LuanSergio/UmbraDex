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

declare interface PokemonStats {
  name: string;
  value: number;
}

declare interface PokemonForm {
  id: number;
  name: string;
  isDefault: boolean;
  formsDetails;
  types: string[];
  formName: string;
  formOrder: string;
  stats: PokemonStats;
  image: string;
}

declare interface IPokemonDetails {
  forms: PokemonForm;
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

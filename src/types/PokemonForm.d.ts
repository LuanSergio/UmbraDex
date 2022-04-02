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
  stats: PokemonStats[];
  image: string;
}

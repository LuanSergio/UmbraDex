declare interface IPokemonStats {
  name: string;
  value: number;
}

declare interface IPokemonForm {
  id: number;
  name: string;
  isDefault: boolean;
  formsDetails;
  types: string[];
  formName: string;
  formOrder: string;
  stats: PokemonStats[];
  image: string;
  weight: string;
  height: string;
}

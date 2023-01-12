declare interface IBasicFormInfo {
  name: string;
  types: string[];
  image: string;
  isDefault: boolean;
}

declare interface IBasicPokemonInfo {
  id: number;
  forms: IBasicFormInfo[];
}

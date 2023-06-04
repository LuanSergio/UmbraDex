export default class PokemonSummary {
  public types: string[];

  public isDefault: boolean;

  public name: string;

  public image: string;

  public id: number;

  constructor(
    types: string[],
    isDefault: boolean,
    name: string,
    image: string,
    id: number,
  ) {
    this.types = types;
    this.isDefault = isDefault;
    this.name = name;
    this.image = image;
    this.id = id;
  }
}

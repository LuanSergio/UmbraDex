import PokemonStats from '@domain/entities/PokemonStats';

export default class PokemonForm {
  public id: number;

  public name: string;

  public isDefault: boolean;

  public formsDetails;

  public types: string[];

  public formName: string;

  public formOrder: string;

  public stats: PokemonStats[];

  public image: string;

  public weight: string;

  public height: string;

  constructor(
    id: number,
    name: string,
    isDefault: boolean,
    formsDetails,
    types: string[],
    formName: string,
    formOrder: string,
    stats: PokemonStats[],
    image: string,
    weight: string,
    height: string,
  ) {
    this.id = id;
    this.name = name;
    this.isDefault = isDefault;
    this.formsDetails = formsDetails;
    this.types = types;
    this.formName = formName;
    this.formOrder = formOrder;
    this.stats = stats;
    this.image = image;
    this.weight = weight;
    this.height = height;
  }
}

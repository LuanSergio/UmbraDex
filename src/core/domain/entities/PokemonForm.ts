import PokemonStats from '@domain/entities/PokemonStats';

export default class PokemonForm {
  public id: number;

  public name: string;

  public isDefault: boolean;

  public types: string[];

  public formName: string;

  public formOrder: number;

  public stats: PokemonStats[];

  public image: string;

  public weight: number;

  public height: number;

  public abilities: string[];

  public groupVersion: number;

  constructor(
    id: number,
    name: string,
    isDefault: boolean,
    types: string[],
    formName: string,
    formOrder: number,
    stats: PokemonStats[],
    image: string,
    weight: number,
    height: number,
    abilities: string[],
    groupVersion: number,
  ) {
    this.id = id;
    this.name = name;
    this.isDefault = isDefault;
    this.types = types;
    this.formName = formName;
    this.formOrder = formOrder;
    this.stats = stats;
    this.image = image;
    this.weight = weight;
    this.height = height;
    this.groupVersion = groupVersion;
    this.abilities = abilities;
  }
}

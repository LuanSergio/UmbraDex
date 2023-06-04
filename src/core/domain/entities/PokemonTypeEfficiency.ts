import TypeEfficiency from '@domain/entities/TypeEfficiency';

export default class PokemonTypeEfficiency {
  public weakness: TypeEfficiency[];

  public immunities: TypeEfficiency[];

  public resistances: TypeEfficiency[];

  constructor(
    weakness: TypeEfficiency[],
    immunities: TypeEfficiency[],
    resistances: TypeEfficiency[],
  ) {
    this.weakness = weakness;
    this.immunities = immunities;
    this.resistances = resistances;
  }
}

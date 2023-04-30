export default class PokemonDescription {
  public id: number;

  public description: string;

  public gameVersion: number;

  constructor(id: number, description: string, gameVersion: number) {
    this.id = id;
    this.description = description;
    this.gameVersion = gameVersion;
  }
}

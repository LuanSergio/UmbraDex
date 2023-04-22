export default class PokemonDescription {
  public id: string;

  public description: string;

  public gameVersion: number;

  constructor(id: string, description: string, gameVersion: number) {
    this.id = id;
    this.description = description;
    this.gameVersion = gameVersion;
  }
}

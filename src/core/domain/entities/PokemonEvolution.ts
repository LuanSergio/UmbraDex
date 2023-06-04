export default class PokemonEvolution {
  public id: number;

  public name: string;

  public order: number;

  constructor(id: number, name: string, order: number) {
    this.id = id;
    this.name = name;
    this.order = order;
  }
}

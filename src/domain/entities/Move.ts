export default class Move {
  public name: string;

  public power: number;

  public pp: number;

  public accuracy: number;

  public category: string;

  public type: string;

  constructor(
    name: string,
    power: number,
    pp: number,
    accuracy: number,
    category: string,
    type: string,
  ) {
    this.name = name;
    this.power = power;
    this.pp = pp;
    this.accuracy = accuracy;
    this.category = category;
    this.type = type;
  }
}

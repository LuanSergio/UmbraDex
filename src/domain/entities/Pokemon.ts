import PokemonDescription from '@domain/entities/PokemonDescription';
import PokemonEvolution from '@domain/entities/PokemonEvolution';

export default class Pokemon {
  japaneseName: string;

  descriptions: PokemonDescription[];

  evolutionChain: PokemonEvolution[];

  constructor(
    japaneseName: string,
    descriptions: PokemonDescription[],
    evolutionChain: PokemonEvolution[],
  ) {
    this.japaneseName = japaneseName;
    this.descriptions = descriptions;
    this.evolutionChain = evolutionChain;
  }
}

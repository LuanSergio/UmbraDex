import PokemonDescription from '@domain/entities/PokemonDescription';
import PokemonEvolution from '@domain/entities/PokemonEvolution';
import PokemonForm from '@domain/entities/PokemonForm';

export default class Pokemon {
  japaneseName: string;

  descriptions: PokemonDescription[];

  evolutionChain: PokemonEvolution[];

  pokedexLimit: number;

  forms: PokemonForm[];

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

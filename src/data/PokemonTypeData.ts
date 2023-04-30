import { Either, right, left } from '@core/Either';
import PokemonTypesRepository from '@domain/repository/PokemonTypesRepository';
import PokemonType from '@domain/entities/PokemonType';
import PokemonTypeEfficiency from '@domain/entities/PokemonTypeEfficiency';
import formatTypeEfficiency from '@data/format/formatTypeEfficiency';

import IHttpClient from '@services/http/IHttpClient';

interface IGetAllTypesResponse {
  types: PokemonType[];
}

interface ITypeEfficacy {
  damageFactor: number;
}

interface ITypeEfficaciesResponse {
  name: string;
  efficacies: ITypeEfficacy[];
}

interface IGetPokemonTypeEfficaciesResponse {
  typeEfficacies: ITypeEfficaciesResponse[];
}

export default class PokemonTypeData implements PokemonTypesRepository {
  private readonly getAllPokemonTypesQuery = `
  query PokemonType {
    types {
      id
      name
    }
  }`;

  private readonly getAllPokemonTypeEfficaciesQuery = (typesId: number[]) => `
  query TypeEfficacies {
    typeEfficacies: pokemon_v2_type {
      name
      efficacies: pokemon_v2_typeefficacies(where: {damage_factor: {_neq: 100}, target_type_id: {_in: [${typesId.toString()}]}}) {
        damageFactor: damage_factor
        typeId: target_type_id
      }
    }
  }`;

  constructor(private readonly client: IHttpClient) {}

  async getAll(): Promise<Either<Error, PokemonType[]>> {
    try {
      const result = await this.client.request<IGetAllTypesResponse>({
        query: this.getAllPokemonTypesQuery,
      });

      return right(result.body.types);
    } catch (error) {
      return left(error);
    }
  }

  async getPokemonTypeEfficacies(
    typesId: number[],
  ): Promise<Either<Error, PokemonTypeEfficiency>> {
    try {
      const result =
        await this.client.request<IGetPokemonTypeEfficaciesResponse>({
          query: this.getAllPokemonTypeEfficaciesQuery(typesId),
        });

      return right(formatTypeEfficiency(result.body.typeEfficacies));
    } catch (error) {
      return left(error);
    }
  }
}

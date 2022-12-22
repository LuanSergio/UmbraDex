interface IFormatQueryFiltersParams {
  search: string;
  generation: string[];
  type: string[];
}

function formatQueryFilters({
  search,
  generation,
  type,
}: IFormatQueryFiltersParams) {
  const filterSearch = `
  ${
    search?.length
      ? `${search.length > 0 ? `name: {_regex: ${search}}, ` : ''}`
      : ''
  }`;

  const filterGeneration = `
  ${
    generation?.length
      ? `pokemon_v2_generation: {id: {_in: [${generation.toString()}]}}, `
      : ''
  }`;

  const filterType = `
  ${
    type?.length
      ? `pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: [${type.toString()}]}}}}`
      : ''
  }`;

  return `where: {${filterSearch} ${filterGeneration} ${filterType}}, `;
}

export default formatQueryFilters;

interface IFormatQueryFiltersParams {
  search?: string;
  generation?: string[];
  type?: string[];
}

function formatQueryFilters({
  search,
  generation,
  type,
}: IFormatQueryFiltersParams) {
  if (!search.length && !generation?.length && !type?.length) return '';

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

  return `where: {${filterSearch}${filterGeneration}${filterType}}, `;
}

export default formatQueryFilters;

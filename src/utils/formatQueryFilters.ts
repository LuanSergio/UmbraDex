interface IFormatQueryFiltersParams {
  search: string;
  generation: string;
  type: string;
}

function formatQueryFilters({
  search,
  generation,
  type,
}: IFormatQueryFiltersParams) {
  const filter = `
  ${
    search?.length || generation?.length || type?.length
      ? `where: {
    ${search.length ? `name: {_regex: ${search}}, ` : ''}
    ${
      generation.length
        ? `pokemon_v2_generation: {id: {_eq: ${generation}}}, `
        : ''
    }
    ${
      type.length
        ? `pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: ${type}}}}}`
        : ''
    }
  }`
      : ''
  }`;

  return filter;
}

export default formatQueryFilters;

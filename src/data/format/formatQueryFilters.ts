interface FormatQueryFiltersParams {
  search?: string;
  generation?: string[];
  primaryType?: string[];
  secondaryType?: string[];
}

function formatQueryFilters({
  search,
  generation,
  primaryType,
  secondaryType,
}: FormatQueryFiltersParams) {
  if (!search.length && !generation?.length && !primaryType?.length) return '';

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

  let filterType = '';

  if (secondaryType?.length > 0) {
    filterType = `
      ${
        primaryType?.length
          ? `
          pokemon_v2_pokemons: {
            _and: [
              {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: [${primaryType.toString()}]}}}},
              {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: [${secondaryType.toString()}]}}}}
            ]
          }
          `
          : ''
      }`;
  } else {
    filterType = `
      ${
        primaryType?.length
          ? `pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: [${primaryType.toString()}]}}}}`
          : ''
      }`;
  }

  return `where: {${filterSearch}${filterGeneration}${filterType}}, `;
}

export default formatQueryFilters;

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
      ? `generation: {id: {_in: [${generation.toString()}]}}, `
      : ''
  }`;

  let filterType = '';

  if (secondaryType?.length > 0) {
    filterType = `
      ${
        primaryType?.length
          ? `
          pokemons: {
            _and: [
              {pokemontypes: {type: {name: {_in: [${primaryType.toString()}]}}}},
              {pokemontypes: {type: {name: {_in: [${secondaryType.toString()}]}}}}
            ]
          }
          `
          : ''
      }`;
  } else {
    filterType = `
      ${
        primaryType?.length
          ? `pokemons: {pokemontypes: {type: {name: {_in: [${primaryType.toString()}]}}}}`
          : ''
      }`;
  }

  return `where: {${filterSearch}${filterGeneration}${filterType}}, `;
}

export default formatQueryFilters;

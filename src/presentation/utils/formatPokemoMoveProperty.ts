import replaceDashWithSpace from '@helpers/replaceDashWithSpace';
import transformFirstLetterToUppercase from '@helpers/transformFirstLetterToUppercase';

function formatPokemonMoveProperty(property: string | number): string {
  const propertyString = property?.toString();

  if (!propertyString?.length) {
    return '-';
  }

  return transformFirstLetterToUppercase(replaceDashWithSpace(propertyString));
}

export default formatPokemonMoveProperty;

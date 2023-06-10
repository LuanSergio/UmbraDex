import replaceDashWithSpace from '@utils/replaceDashWithSpace';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';

function formatPokemonMoveProperty(property: string | number): string {
  const propertyString = property?.toString();

  if (!propertyString?.length) {
    return '-';
  }

  return transformFirstLetterToUppercase(replaceDashWithSpace(propertyString));
}

export default formatPokemonMoveProperty;

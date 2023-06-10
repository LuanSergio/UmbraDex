import replaceDashWithSpace from '@utils/replaceDashWithSpace';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';

function formatAbilityName(ability: string): string {
  return transformFirstLetterToUppercase(replaceDashWithSpace(ability));
}

export default formatAbilityName;

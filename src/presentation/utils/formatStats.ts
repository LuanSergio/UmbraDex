import transformFirstLetterToUppercase from '@helpers/transformFirstLetterToUppercase';

export default function formatStats(stat: string, shortName?: boolean): string {
  return transformFirstLetterToUppercase(
    shortName
      ? stat
          .replace('special', 'sp.')
          .replace('attack', 'atk')
          .replace('defense', 'def')
          .replace('-', ' ')
      : stat.replace('special', 'sp.').replace('-', ' '),
  );
}

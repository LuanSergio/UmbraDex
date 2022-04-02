import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';

export default function formatStats(stat: string): string {
  return transformFirstLetterToUppercase(
    stat.replace('special', 'sp.').replace('-', ' '),
  );
}

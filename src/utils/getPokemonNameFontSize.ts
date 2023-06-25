export default function getPokemonNameFontSize(textLength: number): string {
  if (!(textLength > 14)) {
    return 'name';
  }

  if (textLength > 22) {
    return 'nameSmaller';
  }

  return 'nameSmall';
}

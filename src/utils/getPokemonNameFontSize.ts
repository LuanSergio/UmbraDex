export default function getPokemonNameFontSize(textLength: number): string {
  if (!(textLength > 8)) {
    return 'name';
  }

  if (textLength > 8) {
    return 'nameSmaller';
  }

  return 'nameSmall';
}

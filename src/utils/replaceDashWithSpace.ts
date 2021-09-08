export default function replaceDashWithSpace(string: string): string {
  return string.split('-').reduce((firstString, secondString) => {
    return `${firstString} ${secondString}`;
  });
}

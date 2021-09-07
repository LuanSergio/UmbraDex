export default function transformDashedCaseToCamelCase(string: string): string {
  return string.split('-').reduce((firstString, secondString) => {
    return (
      firstString + secondString.charAt(0).toUpperCase() + secondString.slice(1)
    );
  });
}

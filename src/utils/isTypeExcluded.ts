const excludedTypes = ['shadow', 'unknown'];

export default function isTypeExcluded(type: string): boolean {
  return excludedTypes.includes(type);
}

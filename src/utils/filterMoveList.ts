import Move from '@domain/entities/Move';

export default function filterUniqueItems(items: Move[]): Move[] {
  const uniqueNames: Set<string> = new Set();

  return items.filter(item => {
    if (uniqueNames.has(item.name)) {
      return false;
    }

    uniqueNames.add(item.name);
    return true;
  });
}

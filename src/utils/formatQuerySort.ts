function formatQuerySort(sortValue) {
  if (!sortValue?.length) return '';

  if (sortValue === 'numeral-ascending' || sortValue === 'numeral-descending') {
    if (sortValue === 'numeral-ascending') {
      return `order_by: {id: asc}`;
    }

    return `order_by: {id: desc}`;
  }

  if (sortValue === 'alphabetical-ascending') {
    return `order_by: {name: asc}`;
  }

  return `order_by: {name: desc}`;
}

export default formatQuerySort;

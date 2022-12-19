interface IFormatQuerySortParams {
  numeralOrder: 'desc' | 'asc' | undefined;
  nameOrder: 'desc' | 'asc' | undefined;
}

function formatQuerySort({ numeralOrder, nameOrder }: IFormatQuerySortParams) {
  const sort = `
  ${
    numeralOrder?.length || nameOrder?.length
      ? `order_by: {
    ${numeralOrder.length ? numeralOrder : ''}
    ${nameOrder.length ? nameOrder : ''}
  }`
      : ''
  }`;

  return sort;
}

export default formatQuerySort;

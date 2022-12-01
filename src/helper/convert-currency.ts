export const convertCurrency = (value: number) => {
  const formatCoin = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return formatCoin.format(value);
};

const CPI_TODAY = 260.28;

export const accountForInflation = (fromCPI: number, dollars: number) => {
  return (dollars * fromCPI) / CPI_TODAY;
};

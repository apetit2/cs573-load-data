import { useEffect } from 'react';

export const useIncrementYear = (
  maxYear: number,
  minYear: number,
  shouldIncrement: boolean,
  currentSelectedYear: number,
  setYear: (year: number) => void
) => {
  useEffect(() => {
    if (!shouldIncrement) {
      return;
    }

    const interval = setInterval(() => {
      if (currentSelectedYear === maxYear) {
        setYear(minYear);
      } else {
        setYear(currentSelectedYear + 1);
      }
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval);
  }, [currentSelectedYear, shouldIncrement, setYear, maxYear, minYear]);
};

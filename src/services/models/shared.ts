export interface CSVRow extends Record<string, number | string | undefined> {
  rowType: 'Hurricane' | 'Avocado' | 'MinWage' | 'Rent';
}

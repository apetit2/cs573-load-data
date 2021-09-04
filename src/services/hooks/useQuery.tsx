import { DSVRowArray } from 'd3-dsv';
import { fetchAvocadoCSV } from '../lib/avocado';
import { fetchHurricaneCSV } from '../lib/hurricane';
import { fetchMinimumWageCSV } from '../lib/minimumWage';
import { useQuery } from 'react-query';

const useMinimumWageQuery = () =>
  useQuery<DSVRowArray<string>, Error>('minWage', fetchMinimumWageCSV);

const useAvocadoQuery = () =>
  useQuery<DSVRowArray<string>, Error>('avocado', fetchAvocadoCSV);

const useHurricaneQuery = () =>
  useQuery<DSVRowArray<string>, Error>('hurricane', fetchHurricaneCSV);

export { useAvocadoQuery, useHurricaneQuery, useMinimumWageQuery };

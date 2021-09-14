import { Avocado } from '../models/avocado';
import { DSVParsedArray } from 'd3-dsv';
import { Hurricane } from '../models/hurricane';
import { MinimumWage } from '../models/minimumWage';
import { fetchAvocadoCSV } from '../lib/avocado';
import { fetchHurricaneCSV } from '../lib/hurricane';
import { fetchMinimumWageCSV } from '../lib/minimumWage';
import { useQuery } from 'react-query';

const useMinimumWageQuery = () =>
  useQuery<DSVParsedArray<MinimumWage>, Error>('minWage', fetchMinimumWageCSV);

const useAvocadoQuery = () =>
  useQuery<DSVParsedArray<Avocado>, Error>('avocado', fetchAvocadoCSV);

const useHurricaneQuery = () =>
  useQuery<DSVParsedArray<Hurricane>, Error>('hurricane', fetchHurricaneCSV);

export { useAvocadoQuery, useHurricaneQuery, useMinimumWageQuery };

import { USMap, WorldMap } from '../models/maps';
import { UseQueryOptions, useQuery } from 'react-query';
import { fetchUSMap, fetchWorldMap } from '../lib/maps';

import { Avocado } from '../models/avocado';
import { DSVParsedArray } from 'd3-dsv';
import { Hurricane } from '../models/hurricane';
import { MinimumWage } from '../models/minimumWage';
import { fetchAvocadoCSV } from '../lib/avocado';
import { fetchHurricaneCSV } from '../lib/hurricane';
import { fetchMinimumWageCSV } from '../lib/minimumWage';

const useMinimumWageQuery = () =>
  useQuery<DSVParsedArray<MinimumWage>, Error>('minWage', fetchMinimumWageCSV);

const useAvocadoQuery = () =>
  useQuery<DSVParsedArray<Avocado>, Error>('avocado', fetchAvocadoCSV);

const useHurricaneQuery = () =>
  useQuery<DSVParsedArray<Hurricane>, Error>('hurricane', fetchHurricaneCSV);

const useWorldMapQuery = (options?: UseQueryOptions<WorldMap, Error>) =>
  useQuery<WorldMap, Error>('worldMap', fetchWorldMap, options);

const useUSMapQuery = (options?: UseQueryOptions<USMap, Error>) =>
  useQuery<USMap, Error>('usMap', fetchUSMap, options);

export {
  useAvocadoQuery,
  useHurricaneQuery,
  useMinimumWageQuery,
  useWorldMapQuery,
  useUSMapQuery,
};

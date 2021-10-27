import { USMap, WorldMap } from '../models/maps';
import { UseQueryOptions, useQuery } from 'react-query';
import { fetchUSMap, fetchWorldMap } from '../lib/maps';

import { Avocado } from '../models/avocado';
import { DSVParsedArray } from 'd3-dsv';
import { Hurricane } from '../models/hurricane';
import { MinimumWage, Rent } from '../models/minimumWage';
import { fetchAvocadoCSV } from '../lib/avocado';
import { fetchHurricaneCSV } from '../lib/hurricane';
import { fetchMinimumWageCSV, fetchRentCSV } from '../lib/minimumWage';

const useMinimumWageQuery = (
  options?: UseQueryOptions<DSVParsedArray<MinimumWage>, Error>
) =>
  useQuery<DSVParsedArray<MinimumWage>, Error>(
    'minWage',
    fetchMinimumWageCSV,
    options
  );

const useRentQuery = (options?: UseQueryOptions<DSVParsedArray<Rent>, Error>) =>
  useQuery<DSVParsedArray<Rent>, Error>('rent', fetchRentCSV, options);

const useAvocadoQuery = (
  options?: UseQueryOptions<DSVParsedArray<Avocado>, Error>
) =>
  useQuery<DSVParsedArray<Avocado>, Error>('avocado', fetchAvocadoCSV, options);

const useHurricaneQuery = (
  options?: UseQueryOptions<DSVParsedArray<Hurricane>, Error>
) =>
  useQuery<DSVParsedArray<Hurricane>, Error>(
    'hurricane',
    fetchHurricaneCSV,
    options
  );

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
  useRentQuery,
};

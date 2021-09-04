import { API } from '../apis';
import { csv } from 'd3';

export const fetchMinimumWageCSV = async () => {
  const res = await csv(API.MinimumWageCSV);
  return res;
};

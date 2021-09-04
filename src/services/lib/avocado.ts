import { API } from '../apis';
import { csv } from 'd3';

export const fetchAvocadoCSV = async () => {
  const avocadoCSV = await csv(API.AvocadoCSV);
  return avocadoCSV;
};

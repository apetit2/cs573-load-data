import { API } from '../apis';
import { csv } from 'd3';

export const fetchHurricaneCSV = async () => {
  const hurricaneCSV = await csv(API.HurricaneCSV);
  return hurricaneCSV;
};

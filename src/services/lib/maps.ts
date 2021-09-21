import { USMap, WorldMap } from '../models/maps';

import { API } from '../apis';

export const fetchWorldMap = async () => {
  const worldMap = (await (await fetch(API.WorldMap)).json()) as WorldMap;
  return worldMap;
};

export const fetchUSMap = async () => {
  const usMap = (await (await fetch(API.USMap)).json()) as USMap;
  return usMap;
};

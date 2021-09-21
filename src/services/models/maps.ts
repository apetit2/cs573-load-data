/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Map {
  arcs: any;
  bbox: any;
  transform: {
    scale: [number, number];
    translate: [number, number];
    type: string;
  };
  type: any;
}

export interface WorldMap extends Map {
  objects: { countries: Land; land: Land };
}

export interface USMap extends Map {
  objects: { states: Land; nation: Land };
}

export interface Land {
  geometries: {
    arcs: any;
    id: string;
    properties: { name: string };
    type: any;
  }[];
  type: any;
}

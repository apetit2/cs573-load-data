import { select, zoom } from 'd3';

import { useEffect } from 'react';

export const usePanAndZoom = (
  ref: SVGSVGElement | null,
  height: number,
  width: number
) => {
  useEffect(() => {
    if (ref) {
      const svgZoom = zoom<SVGSVGElement, unknown>();

      svgZoom.on('zoom', (event) =>
        select('#states').attr('transform', event.transform)
      );
      svgZoom.scaleExtent([1, 8]);
      svgZoom.translateExtent([
        [0, height - 400],
        [width, height],
      ]);

      select(ref).call(svgZoom);
    }
  }, [ref, height, width]);
};

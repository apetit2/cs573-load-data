import { select, zoom } from 'd3';

import { useEffect } from 'react';

export const usePanAndZoom = (
  ref: React.RefObject<SVGSVGElement>,
  height: number,
  type: 'us' | 'world'
) => {
  useEffect(() => {
    if (ref.current) {
      const svgZoom = zoom<SVGSVGElement, unknown>();

      svgZoom.on('zoom', (event) =>
        select('#countries').attr('transform', event.transform)
      );

      if (type === 'world') {
        svgZoom.scaleExtent([1, 8]);
        svgZoom.translateExtent([
          [-300, 50],
          [1100, height],
        ]);
      } else {
        svgZoom.scaleExtent([1, 8]);
        svgZoom.translateExtent([
          [0, 50],
          [1100, height],
        ]);
      }

      select(ref.current).call(svgZoom);
    }
  }, [ref, height, type]);
};

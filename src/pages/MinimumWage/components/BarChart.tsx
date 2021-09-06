import { DSVRowArray, DSVRowString } from 'd3-dsv';
import { useEffect, useRef } from 'react';

import { select } from 'd3';

const BAR_HEIGHT = 10;
const SCALE_FACTOR = 20;

export interface BarChartProps {
  data: DSVRowArray<string>;
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const container = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data && container.current) {
      const svg = select(container.current);
      const graph = svg
        .attr('width', 400)
        .attr('height', BAR_HEIGHT * data.length);

      const bar = graph
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (row: DSVRowString<string>) => {
          return `translate(0, ${
            Number(row?.['State.Minimum.Wage']) * BAR_HEIGHT
          })`;
        });

      bar
        .append('rect')
        .attr(
          'width',
          (row: DSVRowString<string>) =>
            Number(row?.['State.Minimum.Wage']) * SCALE_FACTOR
        )
        .attr('height', BAR_HEIGHT - 1);
    }
  }, [data, container]);

  return <svg ref={container} />;
};

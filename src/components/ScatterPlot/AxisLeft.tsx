/* eslint-disable react/no-array-index-key */
import { ScaleLinear } from 'd3';

export interface AxisLeftProps {
  yScale: ScaleLinear<number, number, never>;
  width: number;
  tickOffset?: number;
}

export const AxisLeft: React.FC<AxisLeftProps> = ({
  yScale,
  width,
  tickOffset = 3,
}) => (
  <>
    {yScale.ticks().map((tick, index) => (
      <g
        key={index}
        style={{ stroke: '#C0C0BB' }}
        transform={`translate(0,${yScale(tick)})`}
      >
        <line x2={width} />
        <text textAnchor="end" x={-tickOffset} dy=".32em">
          {tick}
        </text>
      </g>
    ))}
  </>
);

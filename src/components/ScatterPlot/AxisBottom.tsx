/* eslint-disable react/no-array-index-key */
import { ScaleLinear } from 'd3';

export interface AxisBottom {
  xScale: ScaleLinear<number, number, never>;
  height: number;
  tickOffset?: number;
}

export const AxisBottom: React.FC<AxisBottom> = ({
  xScale,
  height,
  tickOffset = 3,
}) => {
  return (
    <>
      {xScale.ticks().map((tick, index) => (
        <g
          style={{ stroke: '#C0C0BB' }}
          key={index}
          transform={`translate(${xScale(tick)}, 0)`}
        >
          <line y2={height} />
          <text dy=".71em" textAnchor="middle" y={height + tickOffset}>
            {tick}
          </text>
        </g>
      ))}
    </>
  );
};

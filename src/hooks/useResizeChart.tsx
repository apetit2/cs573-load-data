// adapted from https://wattenberger.com/blog/react-and-d3
import { ResizeObserver } from '@juggle/resize-observer';
import { useEffect, useRef, useState } from 'react';

interface Dimensions {
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

interface CombinedDimensions extends Dimensions {
  boundedHeight: number;
  boundedWidth: number;
}

const initialDimensions = {
  height: 400,
  width: 0,
  marginTop: 10,
  marginRight: 10,
  marginBottom: 40,
  marginLeft: 75,
};

const combineChartDimensions: (dimensions: Dimensions) => CombinedDimensions = (
  dimensions
) => {
  const parsedDimensions = {
    ...dimensions,
    marginTop: dimensions.marginTop || 10,
    marginRight: dimensions.marginRight || 10,
    marginBottom: dimensions.marginBottom || 40,
    marginLeft: dimensions.marginLeft || 75,
  } as Dimensions;

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0
    ),
  };
};

export const useResizeChart = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(initialDimensions.width);
  const [height, setHeight] = useState(initialDimensions.height);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) {
        return;
      }

      const entry = entries[0];
      if (width !== entry.contentRect.width) {
        setWidth(entry.contentRect.width);
      }

      if (height !== entry.contentRect.height) {
        setHeight(entry.contentRect.height);
      }
    });

    if (ref.current) {
      const element = ref.current;
      resizeObserver.observe(element);

      return () => resizeObserver.unobserve(element);
    }

    return () => null;
  }, [height, width]);

  const newChartDimensions = combineChartDimensions({
    ...initialDimensions,
    width,
    height,
  });

  return { ref, dimensions: newChartDimensions };
};

import { useEffect, useState } from 'react';

export const useResizeChart = () => {
  const [containerDiv, setContainerDiv] = useState<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerDiv) {
        setDimensions({
          width: containerDiv.offsetWidth,
          height: containerDiv.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [containerDiv]);

  return { dimensions, setContainerDiv };
};

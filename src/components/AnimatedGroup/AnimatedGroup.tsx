import { forwardRef } from 'react';
import { animated, useSpring } from 'react-spring';

export interface AnimatedGroupProps extends React.HTMLAttributes<SVGGElement> {
  transform?: string;
}

export const AnimatedGroup = forwardRef<SVGGElement, AnimatedGroupProps>(
  ({ children, ...rest }, ref) => {
    const { opacity } = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: 300,
    });

    return (
      <animated.g ref={ref} {...rest} opacity={opacity}>
        {children}
      </animated.g>
    );
  }
);

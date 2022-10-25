import { FC, SVGAttributes } from 'react';

export const SendIcon: FC<SVGAttributes<SVGElement>> = ({
  color = 'currentColor',
  ...svgProps
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...svgProps}
  >
    <path fill={color} d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
  </svg>
);

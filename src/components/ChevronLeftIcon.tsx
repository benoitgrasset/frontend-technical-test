import React, { FC, SVGAttributes } from "react";

export const ChevronLeftIcon: FC<SVGAttributes<SVGElement>> = ({
  color = "currentColor",
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
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.19315 12.5001L16.0259 6.09436L13.9741 3.90575L6.75224 10.6762C5.69871 11.6639 5.69872 13.3362 6.75224 14.3239L13.9741 21.0944L16.0259 18.9057L9.19315 12.5001Z"
      fill={color}
    />
  </svg>
);

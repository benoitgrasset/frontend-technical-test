import React, { FC, SVGAttributes } from "react";

export const AddIcon: FC<SVGAttributes<SVGElement>> = ({
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
      d="M10.5 20V4H13.5V20H10.5Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 10.7H20V13.7H4V10.7Z"
      fill={color}
    />
  </svg>
);

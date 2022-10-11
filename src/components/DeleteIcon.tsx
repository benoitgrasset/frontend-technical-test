import React, { FC, SVGAttributes } from "react";

export const DeleteIcon: FC<SVGAttributes<SVGElement>> = ({
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
      d="M10 4.7234C9.94477 4.7234 9.9 4.76627 9.9 4.81915V5.87234H14.1V4.81915C14.1 4.76627 14.0552 4.7234 14 4.7234H10ZM15.9 5.87234V4.81915C15.9 3.81446 15.0493 3 14 3H10C8.95066 3 8.1 3.81446 8.1 4.81915V5.87234H3V7.59575H4.66199L5.53595 19.3105C5.60697 20.2624 6.43431 21 7.43112 21H16.5689C17.5657 21 18.393 20.2624 18.4641 19.3105L19.338 7.59575H21V5.87234H15.9ZM17.5334 7.59575H6.46658L7.33137 19.1877C7.33511 19.2378 7.37865 19.2766 7.43112 19.2766H16.5689C16.6213 19.2766 16.6649 19.2378 16.6686 19.1877L17.5334 7.59575Z"
      fill={color}
    />
  </svg>
);

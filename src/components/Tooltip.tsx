import React, { FC } from "react";
import cx from "classnames";
import ReactTooltip from "react-tooltip";

import s from "./Tooltip.module.css";

interface Props {
  id?: string;
  className?: string;
  html?: boolean;
  multiline?: boolean;
}
const Tooltip: FC<Props> = ({
  className,
  id,
  html,
  multiline,
  ...otherProps
}) => (
  <ReactTooltip
    arrowColor="transparent"
    effect="solid"
    className={cx(s.tooltip, className)}
    id={id}
    html={html}
    multiline={multiline}
    {...otherProps}
  />
);

export default Tooltip;

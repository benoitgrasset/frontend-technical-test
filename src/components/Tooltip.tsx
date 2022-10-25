import cx from 'classnames';
import dynamic from 'next/dynamic';
import { FC } from 'react';

import s from './Tooltip.module.css';

const ReactTooltip = dynamic(() => import('react-tooltip'), { ssr: false });

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

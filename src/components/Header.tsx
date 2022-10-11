import { useRouter } from "next/router";
import React, { FC } from "react";
import { ChevronLeftIcon } from "./ChevronLeftIcon";
import Tooltip from "./Tooltip";
import styles from "./Header.module.css";

type Props = {
  children?: React.ReactNode;
};

const Header: FC<Props> = (props) => {
  const router = useRouter();
  const { children } = props;

  const handlePreviousPage = () => {
    router.back();
  };

  return (
    <div className={styles.header}>
      <Tooltip id="button-tooltip" />
      <button
        onClick={handlePreviousPage}
        className={styles.button}
        data-for="button-tooltip"
        data-tip="Back to previous page"
      >
        <ChevronLeftIcon />
      </button>
      {children}
    </div>
  );
};

export default Header;

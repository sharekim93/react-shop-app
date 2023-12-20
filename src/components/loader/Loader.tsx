import React from "react";
import { RotatingLines } from "react-loader-spinner";

import styles from "./Loader.module.scss";

interface ILoaderProps {
  basic?: boolean;
}

const Loader = ({ basic }: ILoaderProps) => {
  if (basic)
    return (
      <div className={styles.basicWrapper}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible
        />
      </div>
    );
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible
        />
      </div>
    </div>
  );
};

export default Loader;

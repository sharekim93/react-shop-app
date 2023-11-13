import React from "react";
import Checkbox from "../checkbox/Checkbox";
import Tooltip from "../tooltip/Tooltip";
import styles from "./AutoSignInCheckbox.module.scss";

const AutoSignInCheckbox = ({
  label = "자동 로그인",
  checked,
  disabled,
  orientation = "top",
  messsage = "개인정보 보호를 위해 본인 기기에서만 이용해주세요",
  onChange,
  ...restProps
}) => {
  return (
    <div className={styles.wrapper}>
      <Checkbox
        label={label}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      {checked && (
        <Tooltip
          left={-5}
          top={24}
          orientation={orientation}
          messsage={messsage}
        />
      )}
    </div>
  );
};

export default AutoSignInCheckbox;

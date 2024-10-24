import { default as classNames, default as cn } from 'classnames';
import React from 'react';
import styles from './InputBox.module.scss';

function InputBox() {
  return <input className={cn(styles.inputBox, classNames)} type="text" />;
}

export default InputBox;

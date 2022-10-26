import { InputHTMLAttributes, Ref } from 'react';

import styles from './styles.module.scss';

interface ITextFieldProps {
  label: string;
  helperText?: string;
  adornment?: JSX.Element;
  size?: 'small' | 'normal';
  onAdornmentClick?: () => void;
  value: string;
  theme?: 'primary' | 'secondary';
  inputProps?: InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement>;
  };
}

const TextField = ({
  label,
  helperText,
  value,
  theme = 'primary',
  inputProps,
  adornment,
  size = 'normal',
}: ITextFieldProps): JSX.Element => (
  <div className={styles.textField}>
    <div className={`${styles.container} ${styles[theme]} ${styles[size]}`}>
      <input
        {...inputProps}
        value={value}
        className={`${styles.input} ${
          adornment ? styles.inputWithAdornment : ''
        }`}
      />
      <label
        className={`${styles.label} ${
          value?.length > 0 ? styles.labelTransformed : ''
        }`}
        htmlFor={inputProps?.name}
      >
        {label}
      </label>
      <div className={styles.adornment}>{adornment}</div>
    </div>
    {helperText && <span className={styles.textHelper}>{helperText}</span>}
  </div>
);

export default TextField;

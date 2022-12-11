import styles from './styles.module.scss';

interface IButtonProps {
  children: string;
}

const Button = ({ children }: IButtonProps): JSX.Element => {
  return (
    <button type="button" className={styles.button}>
      {children}
    </button>
  );
};

export default Button;

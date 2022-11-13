import styles from './styles.module.scss';

interface ISwitchToggleProps {
  isChecked: boolean;
  name: string;
}

const SwitchToggle = ({ isChecked, name }: ISwitchToggleProps): JSX.Element => {
  return (
    <label htmlFor={name} className={styles.switch}>
      <input
        name={name}
        checked={isChecked}
        type="checkbox"
        className={styles.input}
      />
      <span className={styles.slider} />
    </label>
  );
};

export default SwitchToggle;

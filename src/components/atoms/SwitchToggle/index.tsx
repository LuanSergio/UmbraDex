import styles from './styles.module.scss';

interface ISwitchToggleProps {
  isChecked: boolean;
  name: string;
  label: string;
}

const SwitchToggle = ({
  isChecked,
  name,
  label,
}: ISwitchToggleProps): JSX.Element => {
  return (
    <label htmlFor={name} className={styles.switch}>
      <span className="h-sr-only">{label}</span>
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

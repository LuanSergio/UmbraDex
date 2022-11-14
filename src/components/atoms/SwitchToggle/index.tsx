import styles from './styles.module.scss';

interface ISwitchToggleProps {
  isChecked: boolean;
  name: string;
  label: string;
  readonly?: boolean;
}

const SwitchToggle = ({
  isChecked,
  name,
  label,
  readonly = false,
}: ISwitchToggleProps): JSX.Element => {
  return (
    <label htmlFor={name} className={styles.switch}>
      <span className="h-sr-only">{label}</span>
      <input
        name={name}
        checked={isChecked}
        type="checkbox"
        className={styles.input}
        readOnly={readonly}
      />
      <span className={styles.slider} />
    </label>
  );
};

export default SwitchToggle;

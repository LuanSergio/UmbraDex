import styles from './styles.module.scss';

interface ITypeBadge {
  children: string;
  size?: 'small' | 'medium';
  modifier?: string;
}

const TypeBadge = ({
  children,
  modifier,
  size = 'medium',
}: ITypeBadge): JSX.Element => (
  <div
    className={`${styles.typeBadge} ${styles[size]} ${styles[children]} ${
      modifier && `${styles.typeBadgeWithModifier}`
    }`}
  >
    {children}
    {modifier && <span className={styles.modifier}>2x</span>}
  </div>
);

export default TypeBadge;

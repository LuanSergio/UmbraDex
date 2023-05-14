import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface TypeBadge {
  children: string;
  size?: 'small' | 'medium';
  modifier?: ReactNode;
}

const TypeBadge = ({
  children,
  modifier,
  size = 'medium',
}: TypeBadge): JSX.Element => (
  <div
    className={`${styles.typeBadge} ${styles[size]} ${styles[children]} ${
      modifier && `${styles.typeBadgeWithModifier}`
    }`}
  >
    {children}
    {modifier && <span className={styles.modifier}>{modifier}</span>}
  </div>
);

export default TypeBadge;

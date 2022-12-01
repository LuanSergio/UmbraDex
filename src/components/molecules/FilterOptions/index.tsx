import BugIcon from '@public/icons/types/bug.svg';
import DarkIcon from '@public/icons/types/dark.svg';
import DragonIcon from '@public/icons/types/dragon.svg';
import ElectricIcon from '@public/icons/types/electric.svg';
import FairyIcon from '@public/icons/types/fairy.svg';
import AlphabetAscendingIcon from '@public/icons/alphabet-ascending.svg';
import AlphabetDescendingIcon from '@public/icons/alphabet-descending.svg';
import NumeralAscendingIcon from '@public/icons/numeral-ascending.svg';
import NumeralDescendingIcon from '@public/icons/numeral-descending.svg';

import styles from './styles.module.scss';

const generations = ['I', 'II', 'III', 'IV', 'V', 'VI'];

const types = {
  bug: <BugIcon />,
  dark: <DarkIcon />,
  dragon: <DragonIcon />,
  electric: <ElectricIcon />,
  fairy: <FairyIcon />,
};

const sort = {
  alphabetAscending: <AlphabetAscendingIcon />,
  alphabetDescending: <AlphabetDescendingIcon />,
  numeralAscending: <NumeralAscendingIcon />,
  numeralDescending: <NumeralDescendingIcon />,
};

const FilterOptions = (): JSX.Element => {
  return (
    <div className={styles.filterOptions}>
      <div className={styles.categoryContainer}>
        <h3 className={styles.subtitle}>Filter by type:</h3>

        <ul className={styles.category}>
          {Object.values(types).map(item => (
            <li className={styles.categoryItem}>
              <span className={`${styles.icon} ${styles.small}`}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.categoryContainer}>
        <h3 className={styles.subtitle}>Filter by generations:</h3>

        <ul className={styles.category}>
          {generations.map(item => (
            <li className={styles.categoryItem}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.categoryContainer}>
        <h3 className={styles.subtitle}>Sort:</h3>

        <ul className={styles.category}>
          {Object.values(sort).map(item => (
            <li className={styles.categoryItem}>
              <span className={styles.icon}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterOptions;

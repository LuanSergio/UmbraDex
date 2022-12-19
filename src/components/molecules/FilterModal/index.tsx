import BugIcon from '@public/icons/types/bug.svg';
import DarkIcon from '@public/icons/types/dark.svg';
import DragonIcon from '@public/icons/types/dragon.svg';
import ElectricIcon from '@public/icons/types/electric.svg';
import FairyIcon from '@public/icons/types/fairy.svg';
import FireIcon from '@public/icons/types/fire.svg';
import FightingIcon from '@public/icons/types/fighting.svg';
import FlyingIcon from '@public/icons/types/flying.svg';
import GhostIcon from '@public/icons/types/ghost.svg';
import GrassIcon from '@public/icons/types/grass.svg';
import GroundIcon from '@public/icons/types/ground.svg';
import IceIcon from '@public/icons/types/ice.svg';
import NormalIcon from '@public/icons/types/normal.svg';
import PoisonIcon from '@public/icons/types/poison.svg';
import PsychicIcon from '@public/icons/types/psychic.svg';
import RockIcon from '@public/icons/types/rock.svg';
import SteelIcon from '@public/icons/types/steel.svg';
import WaterIcon from '@public/icons/types/water.svg';

import { usePokemonListContext } from '@contexts/PokemonListContext';

import Modal from '@components/atoms/Modal';
import Button from '@components/atoms/Button';

import AlphabeticalAscendingIcon from '@public/icons/alphabetical-ascending.svg';
import AlphabeticalDescendingIcon from '@public/icons/alphabetical-descending.svg';
import NumeralAscendingIcon from '@public/icons/numeral-ascending.svg';
import NumeralDescendingIcon from '@public/icons/numeral-descending.svg';

import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';
import replaceDashWithSpace from '@utils/replaceDashWithSpace';

import { ReactChild, useState } from 'react';

import transformNumberToRomanNumeral from '@utils/transformNumberToRomanNumeral';
import styles from './styles.module.scss';

interface IFilterModal {
  children: ReactChild;
}

const generations = ['1', '2', '3', '4', '5', '6', '7', '8'];

const types = {
  bug: <BugIcon />,
  dark: <DarkIcon />,
  dragon: <DragonIcon />,
  electric: <ElectricIcon />,
  fairy: <FairyIcon />,
  fire: <FireIcon />,
  fighting: <FightingIcon />,
  flying: <FlyingIcon />,
  ghost: <GhostIcon />,
  grass: <GrassIcon />,
  ground: <GroundIcon />,
  ice: <IceIcon />,
  normal: <NormalIcon />,
  poison: <PoisonIcon />,
  psychic: <PsychicIcon />,
  rock: <RockIcon />,
  steel: <SteelIcon />,
  water: <WaterIcon />,
};

const sort = {
  'alphabetical-ascending': <AlphabeticalAscendingIcon />,
  'alphabetical-descending': <AlphabeticalDescendingIcon />,
  'numeral-ascending': <NumeralAscendingIcon />,
  'numeral-descending': <NumeralDescendingIcon />,
};

const FilterModal = ({ children }: IFilterModal): JSX.Element => {
  const { handleFilterChange } = usePokemonListContext();
  const [typeFilterValue, setTypeFilterValue] = useState<string[]>([]);
  const [generationFilterValue, setGenerationFilterValue] = useState<string[]>(
    [],
  );

  function handleTypeFilterChange(value) {
    setTypeFilterValue(currentState => {
      if (currentState.includes(value)) {
        return currentState.filter(item => item !== value);
      }

      return [...currentState, value];
    });
  }

  function handleGenerationFilterChange(value) {
    setGenerationFilterValue(currentState => {
      if (currentState.includes(value)) {
        return currentState.filter(item => item !== value);
      }

      return [...currentState, value];
    });
  }

  function handleApplyFilters() {
    handleFilterChange('type', typeFilterValue);
    handleFilterChange('generation', generationFilterValue);
  }

  function handleClearFilters() {
    handleFilterChange('type', []);
    handleFilterChange('generation', []);
  }

  return (
    <Modal
      title="Filter / Sort"
      size="small"
      footer={
        <div className={styles.filterActionContainer}>
          <Button
            theme="secondary"
            buttonProps={{ onClick: handleClearFilters }}
          >
            Clear filter
          </Button>
          <Button buttonProps={{ onClick: handleApplyFilters }}>Apply</Button>
        </div>
      }
      openButton={children}
    >
      <div className={styles.filterModal}>
        <div className={styles.categoryContainer}>
          <h3 className={styles.subtitle}>Filter by type:</h3>

          <ul className={styles.category}>
            {Object.keys(types).map(item => (
              <li key={item}>
                <label
                  className={`${styles.checkboxContainer} ${styles.checkboxTypeContainer}`}
                  htmlFor={`filter-by-type-${item}`}
                  aria-label={`Filter by ${item}`}
                  title={transformFirstLetterToUppercase(item)}
                >
                  <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    id={`filter-by-type-${item}`}
                    name={`filter-by-type-${item}`}
                    onChange={event =>
                      handleTypeFilterChange(event.target.value)
                    }
                    value={item}
                  />
                  <span className={`${styles.checkMark} ${styles[item]} `}>
                    <span className={`${styles.icon} ${styles.small}`}>
                      {types[item]}
                    </span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.categoryContainer}>
          <h3 className={styles.subtitle}>Filter by generations:</h3>

          <ul className={styles.category}>
            {generations.map(item => (
              <li key={item}>
                <label
                  className={`${styles.checkboxContainer} ${styles.checkboxTypeContainer}`}
                  htmlFor={`filter-by-generation-${item}`}
                  aria-label={`Filter by generation ${item}`}
                  title={`Generation ${item}`}
                >
                  <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    id={`filter-by-generation-${item}`}
                    name={`filter-by-generation-${item}`}
                    onChange={event =>
                      handleGenerationFilterChange(event.target.value)
                    }
                    value={`${item}`}
                  />
                  <span className={styles.checkMark}>
                    {transformNumberToRomanNumeral(parseInt(item, 10))}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.categoryContainer}>
          <h3 className={styles.subtitle}>Sort:</h3>

          <ul className={styles.category}>
            {Object.keys(sort).map((item, index) => {
              const itemName = transformFirstLetterToUppercase(
                replaceDashWithSpace(item),
              );

              return (
                <li key={itemName}>
                  <label
                    className={styles.checkboxContainer}
                    htmlFor={`sort-${item}`}
                    aria-label={`Sort by ${itemName}`}
                    title={itemName}
                  >
                    <input
                      className={styles.checkboxInput}
                      type="radio"
                      defaultChecked={index === 0}
                      id={`sort-${item}`}
                      name="sort"
                      value={item}
                    />
                    <span
                      className={`${styles.checkMark} ${styles.checkMarkDark}`}
                    >
                      <span className={styles.icon}>{sort[item]}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;

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
import QuestionMark from '@public/icons/question-mark.svg';
import SnackBar from '@components/atoms/SnackBar';

import { usePokemonListContext } from '@contexts/PokemonListContext';

import Modal from '@components/atoms/Modal';
import Button from '@components/atoms/Button';

import AlphabeticalAscendingIcon from '@public/icons/alphabetical-ascending.svg';
import AlphabeticalDescendingIcon from '@public/icons/alphabetical-descending.svg';
import NumeralAscendingIcon from '@public/icons/numeral-ascending.svg';
import NumeralDescendingIcon from '@public/icons/numeral-descending.svg';

import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';

import { ReactChild, useEffect, useState } from 'react';

import transformNumberToRomanNumeral from '@utils/transformNumberToRomanNumeral';
import TabsDemo from '@components/atoms/Tabs';
import isTypeExcluded from '@utils/isTypeExcluded';
import UnknownFormIcon from '@components/atoms/formIcons/UnknownFormIcon';
import styles from './styles.module.scss';

interface IFilterModal {
  children: ReactChild;
}

const typesIcons = {
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
  unknown: <QuestionMark />,
};

const sort = {
  'numeral-ascending': <NumeralAscendingIcon />,
  'numeral-descending': <NumeralDescendingIcon />,
  'alphabetical-ascending': <AlphabeticalAscendingIcon />,
  'alphabetical-descending': <AlphabeticalDescendingIcon />,
};

const FilterModal = ({ children }: IFilterModal): JSX.Element => {
  const {
    filterValues,
    sortValue: currentSortValue,
    updateFilters,
    updateSort,
    isLoading,
    staticData,
  } = usePokemonListContext();

  const { generations, pokemonTypes: types } = staticData;

  const [primaryTypeFilterValue, setPrimaryTypeFilterValue] = useState<
    string[]
  >([]);
  const [secondaryTypeFilterValue, setSecondaryTypeFilterValue] = useState<
    string[]
  >([]);
  const [generationFilterValue, setGenerationFilterValue] = useState<number[]>(
    [],
  );
  const [sortValue, setSortValue] = useState<string>('numeral-ascending');

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handlePrimaryTypeFilterChange(value) {
    setPrimaryTypeFilterValue(currentState => {
      if (currentState.includes(value)) {
        return currentState.filter(item => item !== value);
      }

      return [...currentState, value];
    });
  }

  function handleSecondaryTypeFilterChange(value) {
    setSecondaryTypeFilterValue(currentState => {
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

  function handleFilterOpen() {
    setIsFilterOpen(true);
  }

  function handleSortChange(value: string) {
    setSortValue(value);
  }

  function handleApplyFilters() {
    updateFilters('primaryType', primaryTypeFilterValue);
    updateFilters('secondaryType', secondaryTypeFilterValue);
    updateFilters('generation', generationFilterValue);
    updateSort(sortValue);
    setIsFilterOpen(false);
  }

  useEffect(() => {
    if (filterValues.primaryType?.length)
      setPrimaryTypeFilterValue(filterValues.primaryType);
    if (filterValues.secondaryType?.length)
      setSecondaryTypeFilterValue(filterValues.secondaryType);
    if (filterValues.generation?.length)
      setGenerationFilterValue(filterValues.generation);
    if (currentSortValue?.length) setSortValue(currentSortValue);
  }, [
    filterValues.primaryType,
    filterValues.secondaryType,
    filterValues.generation,
    currentSortValue,
    isFilterOpen,
  ]);

  useEffect(() => {
    if (primaryTypeFilterValue.length === 0) {
      setSecondaryTypeFilterValue([]);
    }
  }, [primaryTypeFilterValue]);

  function handleClearFilters() {
    updateFilters('primaryType', []);
    updateFilters('secondaryType', []);
    setPrimaryTypeFilterValue([]);
    setSecondaryTypeFilterValue([]);
    updateFilters('generation', []);
    setGenerationFilterValue([]);
  }

  return (
    <>
      <Modal
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
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
            <div className={styles.typesContainer}>
              <TabsDemo
                label="Type filter options"
                items={[
                  {
                    title: 'Type 1',
                    value: 'PrimaryType',
                    content: (
                      <ul className={styles.category}>
                        {types.map(
                          item =>
                            isTypeExcluded(item.name) || (
                              <li key={item.name}>
                                <label
                                  className={`${styles.checkboxContainer} ${styles.checkboxTypeContainer}`}
                                  htmlFor={`filter-by-type-${item.name}`}
                                  aria-label={`Filter by ${item.name}`}
                                  title={transformFirstLetterToUppercase(
                                    item.name,
                                  )}
                                >
                                  <input
                                    className={styles.checkboxInput}
                                    type="checkbox"
                                    id={`filter-by-type-${item.name}`}
                                    name={`filter-by-type-${item.name}`}
                                    onChange={event =>
                                      handlePrimaryTypeFilterChange(
                                        event.target.value,
                                      )
                                    }
                                    checked={primaryTypeFilterValue?.some(
                                      typeItem => typeItem === item.name,
                                    )}
                                    value={item.name}
                                  />
                                  <span
                                    className={`${styles.checkMark} ${
                                      styles[item.name]
                                    } `}
                                  >
                                    <span
                                      className={`${styles.icon} ${styles.small}`}
                                    >
                                      {Object.keys(typesIcons).includes(
                                        item.name,
                                      )
                                        ? typesIcons[item.name]
                                        : typesIcons.unknown}
                                    </span>
                                  </span>
                                </label>
                              </li>
                            ),
                        )}
                      </ul>
                    ),
                  },
                  {
                    title: 'Type 2',
                    value: 'SecondaryType',
                    disabled: !(primaryTypeFilterValue?.length > 0),
                    content: (
                      <ul className={styles.category}>
                        {types.map(
                          item =>
                            isTypeExcluded(item.name) || (
                              <li key={item.name}>
                                <label
                                  className={`${styles.checkboxContainer} ${styles.checkboxTypeContainer}`}
                                  htmlFor={`filter-by-type-${item.name}`}
                                  aria-label={`Filter by ${item.name}`}
                                  title={transformFirstLetterToUppercase(
                                    item.name,
                                  )}
                                >
                                  <input
                                    className={styles.checkboxInput}
                                    type="checkbox"
                                    id={`filter-by-type-${item.name}`}
                                    name={`filter-by-type-${item.name}`}
                                    onChange={event =>
                                      handleSecondaryTypeFilterChange(
                                        event.target.value,
                                      )
                                    }
                                    checked={secondaryTypeFilterValue?.some(
                                      typeItem => typeItem === item.name,
                                    )}
                                    value={item.name}
                                  />
                                  <span
                                    className={`${styles.checkMark} ${
                                      styles[item.name]
                                    } `}
                                  >
                                    <span
                                      className={`${styles.icon} ${styles.small}`}
                                    >
                                      {Object.keys(typesIcons).includes(
                                        item.name,
                                      )
                                        ? typesIcons[item.name]
                                        : typesIcons.unknown}
                                    </span>
                                  </span>
                                </label>
                              </li>
                            ),
                        )}
                      </ul>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className={styles.categoryContainer}>
            <h3 className={styles.subtitle}>Filter by generations:</h3>

            <ul className={styles.category}>
              {generations.map(item => (
                <li key={item.id}>
                  <label
                    className={`${styles.checkboxContainer} ${styles.checkboxTypeContainer}`}
                    htmlFor={`filter-by-generation-${item.id}`}
                    aria-label={`Filter by generation ${item.id}`}
                    title={`Generation ${item.id}`}
                  >
                    <input
                      className={styles.checkboxInput}
                      type="checkbox"
                      id={`filter-by-generation-${item.id}`}
                      name={`filter-by-generation-${item.id}`}
                      checked={generationFilterValue?.some(
                        generationItem => generationItem === item.id,
                      )}
                      onChange={event =>
                        handleGenerationFilterChange(event.target.value)
                      }
                      value={`${item.id}`}
                    />
                    <span className={styles.checkMark}>
                      {transformNumberToRomanNumeral(item.id)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.categoryContainer}>
            <h3 className={styles.subtitle}>Sort:</h3>

            <ul className={styles.category}>
              {Object.keys(sort).map(item => {
                const nameId = item.replace(/\s/g, '');

                return (
                  <li key={item}>
                    <label
                      className={styles.checkboxContainer}
                      htmlFor={`sort-${nameId}`}
                      aria-label={`Sort by ${item}`}
                      title={item}
                    >
                      <input
                        className={styles.checkboxInput}
                        type="radio"
                        defaultChecked={item === sortValue}
                        id={`sort-${nameId}`}
                        name="sort"
                        onChange={evt => handleSortChange(evt.target.value)}
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

      {!isLoading &&
        (filterValues.generation?.length > 0 ||
          filterValues.primaryType?.length > 0 ||
          filterValues.secondaryType?.length > 0) && (
          <SnackBar
            adornment={
              <div className={styles.snackBarLoadingIcon}>
                {/* <LoadingIcon /> */}
              </div>
            }
          >
            You have some filters applied, some pokemon may not appear!{' '}
            <button
              type="button"
              onClick={handleFilterOpen}
              className={styles.snackBarFilterButton}
            >
              Click here to check your filters.
            </button>
          </SnackBar>
        )}
    </>
  );
};

export default FilterModal;

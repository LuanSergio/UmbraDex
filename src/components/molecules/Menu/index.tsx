import { useRouter } from 'next/router';

import Routes from '@data/routes';
import createRandomNumber from '@utils/createRandomNumber';
import useThrottle from '@hooks/useThrottle';

import { useThemeContext } from '@contexts/ThemeContext';
import { usePokemonListContext } from '@contexts/PokemonListContext';

import Button from '@components/atoms/Button';
import SwitchToggle from '@components/atoms/SwitchToggle';
import Modal from '@components/atoms/Modal';
import FilterOptions from '@components/molecules/FilterOptions';
import Disclaimer from '@components/molecules/Disclaimer';

import FilterIcon from '@public/icons/filter.svg';
import DocumentIcon from '@public/icons/document.svg';
import MoonIcon from '@public/icons/moon.svg';
import RandomIcon from '@public/icons/random.svg';

import styles from './styles.module.scss';

interface IMenuProps {
  isOpen: boolean;
}

const Menu = ({ isOpen }: IMenuProps): JSX.Element => {
  const router = useRouter();
  const { handleThemeChange, isDarkMode } = useThemeContext();

  const { pokedexLimit } = usePokemonListContext();

  function handleDarkModeToggle() {
    handleThemeChange(!isDarkMode);
  }

  function handleGoToRandomPokemon() {
    router.push(`${Routes.pokemonDetails}/${createRandomNumber(pokedexLimit)}`);
  }

  const throttled = useThrottle(handleGoToRandomPokemon, 5000);

  return (
    <>
      {isOpen && (
        <div className={styles.menu}>
          <ul className={styles.optionsList}>
            <li className={styles.optionsListItem}>
              <button
                type="button"
                className={`${styles.button} ${styles.buttonToggle}`}
                onClick={handleDarkModeToggle}
              >
                <span className={styles.toggleContainer}>
                  <span className={styles.icon}>
                    <MoonIcon />
                  </span>
                  Dark mode
                </span>
                <SwitchToggle
                  readonly
                  label="Toggle dark mode theme"
                  isChecked={isDarkMode}
                  name="dark-mode"
                />
              </button>
            </li>
          </ul>

          <ul className={styles.optionsList}>
            <li className={styles.optionsListItem}>
              <button
                type="button"
                className={styles.button}
                onClick={throttled}
              >
                <span className={styles.icon}>
                  <RandomIcon />
                </span>
                Random
              </button>
            </li>

            <li className={styles.optionsListItem}>
              <Modal
                title="Filter / Sort"
                size="small"
                footer={
                  <div className={styles.filterActionContainer}>
                    <Button>Apply filter</Button>
                  </div>
                }
                openButton={
                  <button type="button" className={styles.button}>
                    <span className={styles.icon}>
                      <FilterIcon />
                    </span>
                    Filters / Sort
                  </button>
                }
              >
                <FilterOptions />
              </Modal>
            </li>
          </ul>

          <ul className={styles.optionsList}>
            <li className={styles.optionsListItem}>
              <Modal
                size="small"
                title="Disclaimer"
                openButton={
                  <button type="button" className={styles.button}>
                    <span className={styles.icon}>
                      <DocumentIcon />
                    </span>
                    Disclaimer
                  </button>
                }
              >
                <Disclaimer />
              </Modal>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Menu;

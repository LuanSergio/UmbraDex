import { useRouter } from 'next/router';

import RandomIcon from '@public/icons/random.svg';
import MoonIcon from '@public/icons/moon.svg';
import FilterIcon from '@public/icons/filter.svg';
import DocumentIcon from '@public/icons/document.svg';
import SwitchToggle from '@components/atoms/SwitchToggle';
import Modal from '@components/atoms/Modal';
import createRandomNumber from '@utils/createRandomNumber';
import { useThemeContext } from '@contexts/ThemeContext';
import { usePokemonListContext } from '@contexts/PokemonListContext';
import Routes from '@data/routes';
import useThrottle from '@hooks/useThrottle';

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
              <button type="button" className={styles.button}>
                <span className={styles.icon}>
                  <FilterIcon />
                </span>
                Filters / Sort
              </button>
            </li>
          </ul>

          <ul className={styles.optionsList}>
            <li className={styles.optionsListItem}>
              <Modal
                size="small"
                openButton={
                  <button type="button" className={styles.button}>
                    <span className={styles.icon}>
                      <DocumentIcon />
                    </span>
                    Disclaimer
                  </button>
                }
              >
                <p className={styles.disclaimerText}>
                  This website was made as a study project, with no no financial
                  purpose. <br />
                  <br />
                  All image contents within are Copyright The Pokémon Company.
                  Pokémon © 2002-2023 Pokémon. © 1995-2023 Nintendo/Creatures
                  Inc./GAME FREAK inc. TM, ® and Pokémon character names are
                  trademarks of Nintendo.
                  <br />
                  <br />
                  No copyright or trademark infringement is intended in using
                  Pokémon content on this website.
                </p>
              </Modal>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Menu;

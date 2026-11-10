import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import FilterIcon from '@public/icons/filter.svg';
import DocumentIcon from '@public/icons/document.svg';
import MoonIcon from '@public/icons/moon.svg';
import RandomIcon from '@public/icons/random.svg';
import InstallIcon from '@public/icons/install.svg';

import Routes from 'src/constants/routes';
import createRandomNumber from '@utils/createRandomNumber';
import useThrottleFunction from 'src/hooks/useThrottleFunction';

import { usePokemonListContext } from 'src/contexts/PokemonListContext';
import { usePwaContext } from 'src/contexts/PwaContext';

import SwitchToggle from '@components/SwitchToggle';
import Modal from '@components/Modal';
import FilterModal from '@components/FilterModal';
import Disclaimer from '@components/Disclaimer';
import InstallInstructions from '@components/InstallInstructions';

import styles from './styles.module.scss';

interface MenuProps {
  isOpen: boolean;
  isInnerPage?: boolean;
}

const Menu = ({ isOpen, isInnerPage = false }: MenuProps): JSX.Element => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const { staticData } = usePokemonListContext();
  const { pokedexLimit } = staticData;

  const { canInstall, needsManualInstall, promptInstall } = usePwaContext();

  function handleDarkModeToggle() {
    setTheme(theme !== 'light' ? 'light' : 'dark');
  }

  function handleGoToRandomPokemon() {
    router.push(`${Routes.pokemonDetails}/${createRandomNumber(pokedexLimit)}`);
  }

  const throttled = useThrottleFunction(handleGoToRandomPokemon, 5000);

  return (
    <>
      {isOpen && (
        <div className={styles.menu}>
          <ul className={styles.optionsList}>
            {!isInnerPage && (
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
                    isChecked={theme !== 'light'}
                    name="dark-mode"
                  />
                </button>
              </li>
            )}
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
            {!isInnerPage && (
              <li className={styles.optionsListItem}>
                <FilterModal>
                  <button type="button" className={styles.button}>
                    <span className={styles.icon}>
                      <FilterIcon />
                    </span>
                    Filters / Sort
                  </button>
                </FilterModal>
              </li>
            )}
          </ul>
          {canInstall && (
            <ul className={styles.optionsList}>
              <li className={styles.optionsListItem}>
                {needsManualInstall ? (
                  <Modal
                    size="small"
                    title="Install UmbraDex"
                    openButton={
                      <button type="button" className={styles.button}>
                        <span className={styles.icon}>
                          <InstallIcon />
                        </span>
                        Install app
                      </button>
                    }
                  >
                    <InstallInstructions />
                  </Modal>
                ) : (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={promptInstall}
                  >
                    <span className={styles.icon}>
                      <InstallIcon />
                    </span>
                    Install app
                  </button>
                )}
              </li>
            </ul>
          )}
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

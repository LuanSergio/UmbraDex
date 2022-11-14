import { useState } from 'react';

import SortIcon from '@public/icons/sort.svg';
import RandomIcon from '@public/icons/random.svg';
import MoonIcon from '@public/icons/moon.svg';
import FilterIcon from '@public/icons/filter.svg';
import DocumentIcon from '@public/icons/document.svg';
import SwitchToggle from '@components/atoms/SwitchToggle';
import Modal from '@components/atoms/Modal';

import { useThemeContext } from '@contexts/ThemeContext';

import styles from './styles.module.scss';

interface IMenuProps {
  isOpen: boolean;
}

const Menu = ({ isOpen }: IMenuProps): JSX.Element => {
  const { handleThemeChange, isDarkMode } = useThemeContext();

  function handleDarkModeToggle() {
    handleThemeChange(!isDarkMode);
  }

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
              <button type="button" className={styles.button}>
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
                Filters
              </button>
            </li>

            <li className={styles.optionsListItem}>
              <button type="button" className={styles.button}>
                <span className={styles.icon}>
                  <SortIcon />
                </span>
                Sort
              </button>
            </li>
          </ul>

          <ul className={styles.optionsList}>
            <li className={styles.optionsListItem}>
              <Modal>
                <button type="button" className={styles.button}>
                  <span className={styles.icon}>
                    <DocumentIcon />
                  </span>
                  Disclaimer
                </button>
              </Modal>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Menu;

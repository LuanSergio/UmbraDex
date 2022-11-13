import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Logo from '@public/icons/logo.svg';
import SearchIcon from '@public/icons/search.svg';
import Github from '@public/icons/github.svg';
import SearchInput from '@components/molecules/SearchInput';
import Menu from '@components/molecules/Menu';
import styles from './styles.module.scss';

const Header = (): JSX.Element => {
  const headerBackgroundRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const hasScrolled = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 0) {
      headerBackgroundRef.current?.classList.add(styles.scrolled);
    } else {
      headerBackgroundRef.current?.classList.remove(styles.scrolled);
    }
  };

  function handleOpenSearchClick() {
    setIsSearchOpen(previousState => !previousState);
  }

  function handleOpenOptionsClick() {
    setIsOptionsOpen(previousState => !previousState);
  }

  useEffect(() => {
    window.addEventListener('scroll', hasScrolled);
    return () => {
      window.removeEventListener('scroll', hasScrolled);
    };
  });

  return (
    <header>
      <div className={styles.header}>
        <div className={`${styles.headerContainer} h-container`}>
          <div
            className={`${isSearchOpen ? `${styles.hiddenMobileItem}` : ''}`}
          >
            <Link href="/">
              <a className={styles.logo} aria-label="UmbraDex">
                <Logo />
              </a>
            </Link>
          </div>

          <div className={styles.search}>
            <SearchInput isOpen={isSearchOpen} />
          </div>

          <div className={styles.rightContainer}>
            <a
              href="https://github.com/LuanSergio/UmbraDex"
              target="_blank"
              aria-label="GitHub"
              title="GitHub"
              className={`${styles.github} ${
                isSearchOpen ? `${styles.hiddenMobileItem}` : ''
              }`}
              rel="noreferrer"
            >
              <Github />
            </a>

            <button
              aria-label="Search"
              title="Search"
              className={styles.searchIcon}
              type="button"
              onClick={handleOpenSearchClick}
            >
              <SearchIcon />
            </button>

            <div className={styles.optionsMenu}>
              <button
                type="button"
                className={`${styles.options} ${
                  isSearchOpen ? `${styles.hiddenMobileItem}` : ''
                }`}
                aria-label="options"
                title="options"
                onClick={handleOpenOptionsClick}
              />
              <Menu isOpen={isOptionsOpen} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerBackground} ref={headerBackgroundRef} />
    </header>
  );
};

export default Header;

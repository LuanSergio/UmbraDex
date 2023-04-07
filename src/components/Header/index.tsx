import { useEffect, useRef, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import Link from 'next/link';
import Logo from '@public/icons/logo.svg';
import SearchIcon from '@public/icons/search.svg';
import Github from '@public/icons/github.svg';
import Options from '@public/icons/options.svg';
import SearchInput from '@components/SearchInput';
import Menu from '@components/Menu';
import useEscapeKeyPress from '@hooks/useEscapeKeyPress';
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

  useEscapeKeyPress({ fn: () => setIsOptionsOpen(false) });

  return (
    <header>
      <div className={styles.header}>
        <div className={RemoveScroll.classNames.fullWidth}>
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
                className={`${styles.iconButton} ${
                  isSearchOpen ? `${styles.hiddenMobileItem}` : ''
                }`}
                rel="noreferrer"
              >
                <span className={styles.icon}>
                  <Github />
                </span>
              </a>

              <button
                aria-label="Search"
                title="Search"
                className={styles.iconButton}
                type="button"
                onClick={handleOpenSearchClick}
              >
                <span className={styles.icon}>
                  <SearchIcon />
                </span>
              </button>

              <div
                className={`${styles.optionsMenu} ${
                  isSearchOpen ? `${styles.hiddenMobileItem}` : ''
                }`}
              >
                <button
                  type="button"
                  className={`${styles.iconButton} `}
                  aria-label="options"
                  title="options"
                  onClick={handleOpenOptionsClick}
                >
                  <span className={styles.icon}>
                    <Options />
                  </span>
                </button>
                <Menu isOpen={isOptionsOpen} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerBackground} ref={headerBackgroundRef} />
    </header>
  );
};

export default Header;

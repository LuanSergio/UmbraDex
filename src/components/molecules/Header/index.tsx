import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Logo from '@public/icons/logo.svg';
import SearchIcon from '@public/icons/search.svg';
import Github from '@public/icons/github.svg';
import SearchInput from '@components/molecules/SearchInput';
import styles from './styles.module.scss';

interface IHeaderProps {
  innerPage?: boolean;
}

const Header = ({ innerPage }: IHeaderProps): JSX.Element => {
  const headerRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const hasScrolled = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 0) {
      headerRef.current?.classList.add(styles.scrolled);
    } else {
      headerRef.current?.classList.remove(styles.scrolled);
    }
  };

  function handleOpenSearchClick() {
    setIsSearchOpen(previousState => !previousState);
  }

  useEffect(() => {
    window.addEventListener('scroll', hasScrolled);
    return () => {
      window.removeEventListener('scroll', hasScrolled);
    };
  });

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={`${styles.headerContainer} h-container`}>
        <div className={`${isSearchOpen ? `${styles.hiddenMobileItem}` : ''}`}>
          <Link href="/">
            <a className={styles.logo} aria-label="UmbraDex">
              <Logo />
            </a>
          </Link>
        </div>
        {!innerPage && (
          <div className={styles.search}>
            <SearchInput isOpen={isSearchOpen} />
          </div>
        )}

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
          {!innerPage && (
            <button
              aria-label="Search"
              title="Search"
              className={styles.searchIcon}
              type="button"
              onClick={handleOpenSearchClick}
            >
              <SearchIcon />
            </button>
          )}
          <button
            type="button"
            className={`${styles.options} ${
              isSearchOpen ? `${styles.hiddenMobileItem}` : ''
            }`}
            aria-label="options"
            title="options"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

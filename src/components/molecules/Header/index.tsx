import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { useSearchContext } from '@contexts/SearchContext';
import Link from 'next/link';
import Logo from '@public/icons/logo.svg';
import SearchIcon from '@public/icons/search.svg';
import ClearIcon from '@public/icons/close.svg';
import LoadingIcon from '@public/icons/loading.svg';
import Github from '@public/icons/github.svg';
import TextField from '@components/atoms/TextField';
import IconButton from '@components/atoms/IconButton';
import useDebounce from '@hooks/useDebounce';
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
        <Link href="/">
          <a className={styles.logo} aria-label="UmbraDex">
            <Logo />
          </a>
        </Link>
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
            className={styles.github}
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
            className={styles.options}
            aria-label="options"
            title="options"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

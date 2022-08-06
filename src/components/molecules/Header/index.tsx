import Link from 'next/link';
import Logo from '@public/icons/logo.svg';
import Github from '@public/icons/github.svg';
import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const Header = (): JSX.Element => {
  const headerRef = useRef(null);

  const hasScrolled = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 0) {
      headerRef.current?.classList.add(styles.scrolled);
    } else {
      headerRef.current?.classList.remove(styles.scrolled);
    }
  };

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

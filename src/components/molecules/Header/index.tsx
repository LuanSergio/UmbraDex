import Link from 'next/link';
import Logo from '../../../assets/images/icons/logo.svg';
import Github from '../../../assets/images/icons/github.svg';
import styles from './styles.module.scss';

const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
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
          <button type="button" className={styles.options}>
            Options
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

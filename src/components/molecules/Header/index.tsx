import Link from 'next/link';
import Logo from '../../../assets/images/icons/logo20.svg';
import Github from '../../../assets/images/icons/github.svg';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <div>
          <Link href="/">
            <a className={styles.logo} aria-label="UmbraDex">
              <Logo />
            </a>
          </Link>
        </div>
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
    </div>
  );
};

export default Header;

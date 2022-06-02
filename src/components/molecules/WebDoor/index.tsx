import Gengar from '@public/webdoor/gengar/gengar.svg';
import Crobat from '@public/webdoor/gengar/crobat.svg';
import Zubat from '@public/webdoor/gengar/zubat.svg';
import useWindowSize from '@hooks/useWindowSize';
import styles from './styles.module.scss';

const WebDoor = (): JSX.Element => {
  const [_, windowHeight] = useWindowSize();

  const title = (
    <>
      Find everything <br />
      about the creatures <br />
      you love!
    </>
  );
  return (
    <section
      className={styles.webDoor}
      style={{ minHeight: `${windowHeight - 77}px` }}
    >
      <div className={`${styles.container} h-container`}>
        <div className={styles.titleHolder}>
          <h1 className={styles.title}>{title}</h1>

          <span aria-hidden="true" className={styles.titleShadow}>
            {title}
          </span>
        </div>
        <Gengar className={styles.gengar} />
        <Crobat className={styles.crobat} />
        <Zubat className={styles.zubat1} />
        <Zubat className={styles.zubat2} />
        <Zubat className={styles.zubat3} />
      </div>
    </section>
  );
};

export default WebDoor;

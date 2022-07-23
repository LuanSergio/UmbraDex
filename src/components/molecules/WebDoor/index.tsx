import { motion } from 'framer-motion';

import Gengar from '@public/webdoor/gengar/gengar.svg';
import Crobat from '@public/webdoor/gengar/crobat.svg';
import Zubat from '@public/webdoor/gengar/zubat.svg';

import styles from './styles.module.scss';

const WebDoor = (): JSX.Element => {
  const title = (
    <>
      Find everything <br />
      about the creatures <br />
      you love!
    </>
  );
  return (
    <section className={styles.webDoor}>
      <div className={`${styles.container} h-container`}>
        <div className={styles.titleContainer}>
          <div className={styles.titleHolder}>
            <h1 className={styles.title}>{title}</h1>

            <span aria-hidden="true" className={styles.titleShadow}>
              {title}
            </span>
          </div>
        </div>

        <motion.div
          transition={{ delay: 0, type: 'tween', duration: 0.85 }}
          initial={{ x: '-300%', y: '400vh' }}
          animate={{ y: 0, x: 0 }}
        >
          <Zubat className={styles.zubat1} />
        </motion.div>

        <motion.div
          transition={{ delay: 0, type: 'tween', duration: 0.85 }}
          initial={{ x: '-300%', y: '400vh' }}
          animate={{ y: 0, x: 0 }}
        >
          <Zubat className={styles.zubat2} />
        </motion.div>

        <motion.div
          transition={{ delay: 0, type: 'tween', duration: 0.85 }}
          initial={{ x: '-300%', y: '400vh' }}
          animate={{ x: 0, y: '0' }}
        >
          <Zubat className={styles.zubat3} />
        </motion.div>

        <motion.div
          className={styles.crobatHolder}
          transition={{ delay: 0.35, type: 'tween', duration: 0.75 }}
          initial={{ x: '-300%', y: '400vh' }}
          animate={{ y: 0, x: 0 }}
        >
          <Crobat className={styles.crobat} />
        </motion.div>
        <motion.div
          transition={{ delay: 1.2, type: 'tween', duration: 0.75 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Gengar className={styles.gengar} />
        </motion.div>
      </div>
    </section>
  );
};

export default WebDoor;

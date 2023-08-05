import { motion } from 'framer-motion';
import SparkleIcon1 from '@public/webdoor/sparkle-1.svg';
import SparkleIcon2 from '@public/webdoor/sparkle-2.svg';
import SparkleIcon3 from '@public/webdoor/sparkle-3.svg';
import SparkleIcon4 from '@public/webdoor/sparkle-4.svg';
import styles from './styles.module.scss';

const ShinySparkle = (): JSX.Element => {
  const defaultAnimation = {
    type: 'tween',
    repeat: 'Infinity',
    repeatType: 'mirror',
  };

  return (
    <div className={styles.sparkleContainer}>
      <div className={styles.sparkle1}>
        <motion.div
          animate={{
            scale: [1, 1.3, 0.8],
            opacity: 1,
            transition: {
              opacity: {
                delay: 1,
                type: 'tween',
                duration: 0.75,
              },
              scale: {
                duration: 1.4,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: Math.random(),
              },
            },
          }}
          initial={{ opacity: 0 }}
        >
          <SparkleIcon1 className={styles.sparkle1Icon} />
        </motion.div>
      </div>
      <div className={styles.sparkle2}>
        <motion.div
          animate={{
            scale: [1, 1.3, 0.8],
            opacity: 1,
            transition: {
              opacity: {
                delay: 1,
                type: 'tween',
                duration: 0.75,
              },
              scale: {
                duration: 1.4,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: Math.random(),
              },
            },
          }}
          initial={{ opacity: 0 }}
        >
          <SparkleIcon2 className={styles.sparkle2Icon} />
        </motion.div>
      </div>
      <div className={styles.sparkle3}>
        <motion.div
          animate={{
            scale: [1, 1.3, 0.8],
            opacity: 1,
            transition: {
              opacity: {
                delay: 1,
                type: 'tween',
                duration: 0.75,
              },
              scale: {
                duration: 1.4,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: Math.random(),
              },
            },
          }}
          initial={{ opacity: 0 }}
        >
          <SparkleIcon3 className={styles.sparkle3Icon} />
        </motion.div>
      </div>
      <div className={styles.sparkle4}>
        <motion.div
          animate={{
            scale: [1, 1.3, 0.8],
            opacity: 1,
            transition: {
              opacity: {
                delay: 1,
                type: 'tween',
                duration: 0.75,
              },
              scale: {
                duration: 1.4,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: Math.random(),
              },
            },
          }}
          initial={{ opacity: 0 }}
        >
          <SparkleIcon4 className={styles.sparkle4Icon} />
        </motion.div>
      </div>
    </div>
  );
};

export default ShinySparkle;

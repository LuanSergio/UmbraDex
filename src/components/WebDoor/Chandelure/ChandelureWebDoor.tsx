import { motion } from 'framer-motion';

import Chandelure from '@public/webdoor/chandelure/chandelure.svg';
import Flame1 from '@public/webdoor/chandelure/flame-1.svg';
import Flame2 from '@public/webdoor/chandelure/flame-2.svg';
import Flame3 from '@public/webdoor/chandelure/flame-3.svg';
import Flame4 from '@public/webdoor/chandelure/flame-4.svg';

import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import chandelureStyles from './chandelure-webdoor.module.scss';

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();

  return (
    <CommonWebDoor
      mainClass={chandelureStyles.chandelureWebDoor}
      shinyClass={chandelureStyles.shiny}
      titlePositionX="right"
      titlePositionY="bottom"
    >
      <>
        <motion.div
          initial={{ scale: 0.8, opacity: 0.01 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              delay: 2.25,
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              },
              opacity: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            },
          }}
          className={chandelureStyles.flame1}
        >
          <Flame1 />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0.01 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              delay: 1.55,
              scale: {
                duration: 2.8,
                repeat: Infinity,
                repeatType: 'reverse',
              },
              opacity: {
                duration: 2.8,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            },
          }}
          className={chandelureStyles.flame2}
        >
          <Flame2 />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0.01 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.75,
              scale: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: 'reverse',
              },
              opacity: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            },
          }}
          className={chandelureStyles.flame3}
        >
          <Flame3 />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0.01 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              delay: 1.25,
              scale: {
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'reverse',
              },
              opacity: {
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            },
          }}
          className={chandelureStyles.flame4}
        >
          <Flame4 />
        </motion.div>
        <div className={chandelureStyles.chandelureHolder}>
          <motion.div
            transition={{ delay: 0.25, type: 'tween', duration: 1.65 }}
            animate={{
              y: 54,
              transition: {
                y: {
                  delay: 0,
                  duration: 1.4,
                  type: 'tween',
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
              },
            }}
            className={chandelureStyles.chandelure}
          >
            <Chandelure />
          </motion.div>
          {isShiny && <ShinySparkle />}
        </div>
      </>
    </CommonWebDoor>
  );
};

export default WebDoor;

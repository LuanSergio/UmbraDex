import { motion } from 'framer-motion';

import Primeape from '@public/webdoor/primeape/primeape.svg';
import AngrySymbol from '@public/webdoor/primeape/angry-symbol.svg';
import Exclamation from '@public/webdoor/primeape/exclamation.svg';

import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import primeapeStyles from './primeape-webdoor.module.scss';

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();

  return (
    <CommonWebDoor
      mainClass={primeapeStyles.primeapeWebDoor}
      shinyClass={primeapeStyles.shiny}
      titlePositionX="right"
      titlePositionY="center"
    >
      <>
        <div className={primeapeStyles.primeapeHolder}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{
              scale: 1,
              transition: {
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
              },
            }}
            className={primeapeStyles.angrySymbol}
          >
            <AngrySymbol />
          </motion.div>

          <div className={primeapeStyles.primeapeContainer}>
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: 0.5,
                transition: {
                  scale: {
                    duration: 1.5,
                    delay: 0,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                },
              }}
              className={primeapeStyles.exclamation1}
            >
              <Exclamation />
            </motion.div>

            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: 0.5,
                transition: {
                  scale: {
                    duration: 1.5,

                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                },
              }}
              className={primeapeStyles.exclamation2}
            >
              <Exclamation />
            </motion.div>

            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: 0.5,
                transition: {
                  scale: {
                    duration: 1.5,

                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                },
              }}
              className={primeapeStyles.exclamation3}
            >
              <Exclamation />
            </motion.div>

            <motion.div
              transition={{ delay: 0.25, type: 'tween', duration: 0.65 }}
              animate={{
                y: 20,
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
              className={primeapeStyles.primeape}
            >
              <Primeape />
            </motion.div>
            {isShiny && <ShinySparkle />}
          </div>
        </div>
      </>
    </CommonWebDoor>
  );
};

export default WebDoor;

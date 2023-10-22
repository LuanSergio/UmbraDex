import { motion } from 'framer-motion';

import Jigglypuff from '@public/webdoor/jigglypuff/jigglypuff.svg';
import JigglypuffFloating from '@public/webdoor/jigglypuff/jigglypuff-floating.svg';
import JigglypuffCorner from '@public/webdoor/jigglypuff/jigglypuff-corner.svg';
import AngrySymbol from '@public/webdoor/jigglypuff/angry-symbol.svg';

import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import jigglypuffStyles from './jigglypuff-webdoor.module.scss';

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();

  return (
    <CommonWebDoor
      mainClass={jigglypuffStyles.jigglypuffWebDoor}
      shinyClass={jigglypuffStyles.shiny}
      titlePositionX="center"
      titlePositionY="top"
    >
      <>
        <div className={jigglypuffStyles.jigglypuffHolder}>
          <motion.div
            initial={{ opacity: 0.01 }}
            animate={{
              opacity: 1,
              transition: {
                opacity: {
                  delay: 0.25,
                  duration: 0.4,
                },
              },
            }}
            className={jigglypuffStyles.jigglypuff}
          >
            <Jigglypuff />
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                opacity: {
                  delay: 0.25,
                  duration: 0.4,
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
              },
            }}
            className={jigglypuffStyles.angrySymbol}
          >
            <AngrySymbol />
          </motion.div>{' '}
          {isShiny && <ShinySparkle />}
        </div>

        <div className={jigglypuffStyles.jigglypuffFloatingHolder}>
          <motion.div
            initial={{ opacity: 0.01 }}
            animate={{
              opacity: 1,
              y: 40,
              x: 40,
              transition: {
                opacity: {
                  delay: 0.25,
                  duration: 0.4,
                },
                y: {
                  delay: 0,
                  duration: 1.6,
                  type: 'tween',
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
                x: {
                  delay: 0,
                  duration: 1.6,
                  type: 'tween',
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
              },
            }}
            className={jigglypuffStyles.jigglypuffFloating}
          >
            <JigglypuffFloating />
          </motion.div>
        </div>

        <div className={jigglypuffStyles.jigglypuffCornerHolder}>
          <motion.div
            initial={{ opacity: 0.01 }}
            animate={{
              opacity: 1,
              y: -100,
              x: 40,
              transition: {
                opacity: {
                  delay: 0.25,
                  duration: 0.4,
                },
                y: {
                  delay: 0,
                  duration: 2.1,
                  type: 'tween',
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
                x: {
                  delay: 0,
                  duration: 2.1,
                  type: 'tween',
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
              },
            }}
            className={jigglypuffStyles.jigglypuffCorner}
          >
            <JigglypuffCorner />
          </motion.div>
        </div>
      </>
    </CommonWebDoor>
  );
};

export default WebDoor;

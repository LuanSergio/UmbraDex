import { motion } from 'framer-motion';

import Raichu from '@public/webdoor/raichu/raichu.svg';
import RaichuArm from '@public/webdoor/raichu/arm.svg';
import GrassBackLeft from '@public/webdoor/raichu/grass-back-left.svg';
import GrassBackRight from '@public/webdoor/raichu/grass-back-right.svg';
import GrassFrontLeft from '@public/webdoor/raichu/grass-front-left.svg';
import GrassFrontRight from '@public/webdoor/raichu/grass-front-right.svg';
import GrassBack from '@public/webdoor/raichu/grass-back.svg';

import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import raichuStyles from './raichu-webdoor.module.scss';

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();

  return (
    <CommonWebDoor
      mainClass={raichuStyles.raichuWebDoor}
      shinyClass={raichuStyles.shiny}
      titlePositionX="right"
      titlePositionY="top"
    >
      <>
        <div className={raichuStyles.raichuHolder}>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{
              x: 0,
              transition: {
                x: {
                  delay: 0.25,
                  duration: 0.4,
                },
              },
            }}
            className={raichuStyles.raichu}
          >
            <Raichu />

            <motion.div
              initial={{ rotate: '-9deg' }}
              animate={{
                rotate: '-3deg',
                transition: {
                  rotate: {
                    delay: 0.45,
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                },
              }}
              className={raichuStyles.raichuArm}
            >
              <RaichuArm />
            </motion.div>
          </motion.div>

          <motion.div
            className={raichuStyles.grassBack}
            initial={{ y: '100%' }}
            animate={{
              y: '0%',
              transition: {
                y: {
                  delay: 0.45,
                  duration: 0.3,
                  type: 'spring',
                  bounce: 0.3,
                },
              },
            }}
          >
            <GrassBack />
          </motion.div>

          <motion.div
            initial={{ y: '100%', x: '-50%' }}
            animate={{
              y: '-10%',
              transition: {
                y: {
                  delay: 0.45,
                  duration: 0.3,
                  type: 'spring',
                  bounce: 0.3,
                },
              },
            }}
            className={raichuStyles.grassBackLeft}
          >
            <GrassBackLeft />
          </motion.div>

          <motion.div
            initial={{ y: '100%', x: '50%' }}
            animate={{
              y: '-10%',
              transition: {
                y: {
                  delay: 0.45,
                  duration: 0.3,
                  type: 'spring',
                  bounce: 0.3,
                },
              },
            }}
            className={raichuStyles.grassBackRight}
          >
            <GrassBackRight />
          </motion.div>

          <motion.div
            initial={{ y: '100%', x: '-50%' }}
            animate={{
              y: '10%',
              transition: {
                y: {
                  delay: 0.45,
                  duration: 0.3,
                  type: 'spring',
                  bounce: 0.3,
                },
              },
            }}
            className={raichuStyles.grassFrontLeft}
          >
            <GrassFrontLeft />
          </motion.div>

          <motion.div
            initial={{ y: '100%', x: '50%' }}
            animate={{
              y: '10%',
              transition: {
                y: {
                  delay: 0.45,
                  duration: 0.3,
                  type: 'spring',
                  bounce: 0.3,
                },
              },
            }}
            className={raichuStyles.grassFrontRight}
          >
            <GrassFrontRight />
          </motion.div>
          {isShiny && <ShinySparkle />}
        </div>
      </>
    </CommonWebDoor>
  );
};

export default WebDoor;

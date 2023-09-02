import { motion } from 'framer-motion';

import Electabuzz from '@public/webdoor/electabuzz/electabuzz.svg';
import Lightning from '@public/webdoor/electabuzz/lightning.svg';
import Lightning2 from '@public/webdoor/electabuzz/lightning-2.svg';

import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import electabuzzStyles from './electabuzz-webdoor.module.scss';

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();

  return (
    <CommonWebDoor
      mainClass={electabuzzStyles.electabuzzWebDoor}
      shinyClass={electabuzzStyles.shiny}
      titlePositionX="right"
      titlePositionY="top"
    >
      <>
        <div className={electabuzzStyles.electabuzzHolder}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0, 1, 0, 1, 0, 1, 0],
              transition: {
                opacity: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
              },
            }}
            className={electabuzzStyles.lightning}
          >
            <Lightning />
          </motion.div>

          <Electabuzz className={electabuzzStyles.electabuzz} />

          {isShiny && <ShinySparkle />}
        </div>
      </>
    </CommonWebDoor>
  );
};

export default WebDoor;

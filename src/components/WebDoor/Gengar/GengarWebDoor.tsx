import { motion } from 'framer-motion';

import Gengar from '@public/webdoor/gengar/gengar.svg';
import Crobat from '@public/webdoor/gengar/crobat.svg';
import Zubat from '@public/webdoor/gengar/zubat.svg';

import useWindowSize from '@hooks/useWindowSize';
import ShinySparkle from '@components/ShinySparkle';
import { useWebDoorContext } from '../WebdoorContext';
import CommonWebDoor from '../CommonWebdoor';

import gengarWebDoorStyles from './gengar-webdoor.module.scss';

const GengarWebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();
  const [windowWidth] = useWindowSize();

  return (
    <CommonWebDoor
      mainClass={gengarWebDoorStyles.gengarWebDoor}
      shinyClass={gengarWebDoorStyles.shiny}
    >
      {windowWidth > 0 && (
        <>
          <motion.div
            transition={{ delay: 0.25, type: 'tween', duration: 0.75 }}
            initial={{ x: '-300%', y: '400vh' }}
            animate={{ y: 0, x: 0 }}
          >
            <Zubat className={gengarWebDoorStyles.zubatTopLeft} />
          </motion.div>

          <motion.div
            transition={{ delay: 0.25, type: 'tween', duration: 0.65 }}
            initial={{ x: '-300%', y: '400vh' }}
            animate={{ y: 0, x: 0 }}
          >
            <Zubat className={gengarWebDoorStyles.zubatBottomLeft} />
          </motion.div>

          <motion.div
            transition={{ delay: 0.25, type: 'tween', duration: 0.75 }}
            initial={{ x: '-300%', y: '400vh' }}
            animate={{ x: 0, y: '0' }}
          >
            <Zubat className={gengarWebDoorStyles.zubatBottomRight} />
          </motion.div>

          <motion.div
            className={gengarWebDoorStyles.crobatHolder}
            transition={{ delay: 0, type: 'tween', duration: 0.65 }}
            initial={{ x: '-300%', y: '400vh' }}
            animate={{ y: 0, x: 0 }}
          >
            <Crobat className={gengarWebDoorStyles.crobat} />
          </motion.div>

          <div className={gengarWebDoorStyles.gengarContainer}>
            <motion.div
              transition={{
                delay: windowWidth > 1280 ? 0.85 : 0,
                type: 'tween',
                duration: 0.75,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Gengar className={gengarWebDoorStyles.gengar} />
            </motion.div>

            {isShiny && <ShinySparkle />}
          </div>
        </>
      )}
    </CommonWebDoor>
  );
};

export default GengarWebDoor;

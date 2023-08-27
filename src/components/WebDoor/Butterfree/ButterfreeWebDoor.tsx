import { motion } from 'framer-motion';

import Butterfree from '@public/webdoor/butterfree/butterfree.svg';
import Petal1 from '@public/webdoor/butterfree/petal-1.svg';
import Petal2 from '@public/webdoor/butterfree/petal-2.svg';
import Petal3 from '@public/webdoor/butterfree/petal-3.svg';
import Petal4 from '@public/webdoor/butterfree/petal-4.svg';
import Petal5 from '@public/webdoor/butterfree/petal-5.svg';
import Petal6 from '@public/webdoor/butterfree/petal-6.svg';
import Petal7 from '@public/webdoor/butterfree/petal-7.svg';
import Petal8 from '@public/webdoor/butterfree/petal-8.svg';

import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import butterfreeStyles from './butterfree-webdoor.module.scss';

interface Petal {
  positionValue: number;
  position: string;
  petal: number;
  rotation: number;
  width: number;
  id: string;
  zIndex: number;
  delay: number;
  initialHorizontalPosition: number;
  finalHorizontalPosition: number;
  duration: number;
}

const petalsList = [
  <Petal1 className={butterfreeStyles.petal} />,
  <Petal2 className={butterfreeStyles.petal} />,
  <Petal3 className={butterfreeStyles.petal} />,
  <Petal4 className={butterfreeStyles.petal} />,
  <Petal5 className={butterfreeStyles.petal} />,
  <Petal6 className={butterfreeStyles.petal} />,
  <Petal7 className={butterfreeStyles.petal} />,
  <Petal8 className={butterfreeStyles.petal} />,
];

const petals: Petal[] = [
  {
    positionValue: 50,
    position: 'right',
    petal: 0,
    rotation: 24,
    width: 4.25,
    id: '01',
    zIndex: 21,
    delay: 0,
    initialHorizontalPosition: 0,
    finalHorizontalPosition: -300,
    duration: 15,
  },
  {
    positionValue: 24,
    position: 'right',
    petal: 1,
    rotation: 20,
    width: 5,
    id: '02',
    zIndex: 21,
    delay: 2,
    initialHorizontalPosition: 40,
    finalHorizontalPosition: -400,
    duration: 13,
  },
  {
    positionValue: 0,
    position: 'right',
    petal: 2,
    rotation: 45,
    width: 3.25,
    id: '03',
    zIndex: 0,
    delay: 1,
    initialHorizontalPosition: 40,
    finalHorizontalPosition: -400,
    duration: 16,
  },
  {
    positionValue: 10,
    position: 'left',
    petal: 3,
    rotation: 30,
    width: 3.5,
    id: '04',
    zIndex: 0,
    delay: 6,
    initialHorizontalPosition: 40,
    finalHorizontalPosition: -400,
    duration: 14,
  },
  {
    positionValue: 12,
    position: 'right',
    petal: 4,
    rotation: 90,
    width: 3.25,
    id: '05',
    zIndex: 0,
    delay: 0,
    initialHorizontalPosition: 40,
    finalHorizontalPosition: -400,
    duration: 12,
  },
  {
    positionValue: 0,
    position: 'left',
    petal: 5,
    rotation: 20,
    width: 3.25,
    id: '06',
    zIndex: 0,
    delay: 2,
    initialHorizontalPosition: 40,
    finalHorizontalPosition: -400,
    duration: 15,
  },
  {
    positionValue: 40,
    position: 'left',
    petal: 6,
    rotation: 30,
    width: 4.65,
    id: '07',
    zIndex: 0,
    delay: 10,
    initialHorizontalPosition: 40,
    finalHorizontalPosition: -400,
    duration: 13,
  },
  {
    positionValue: 32,
    position: 'right',
    petal: 7,
    rotation: 16,
    width: 3.25,
    id: '09',
    zIndex: 21,
    delay: 6,
    initialHorizontalPosition: 40,
    finalHorizontalPosition: -400,
    duration: 14,
  },
];

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();

  return (
    <CommonWebDoor
      mainClass={butterfreeStyles.butterfreeWebDoor}
      shinyClass={butterfreeStyles.shiny}
      titlePositionX="right"
      titlePositionY="bottom"
    >
      <>
        {petals.map(petal => (
          <motion.div
            key={petal.id}
            initial={{
              y: -200,
              x: petal.initialHorizontalPosition,
            }}
            animate={{
              y: '110vh',
              x: petal.finalHorizontalPosition,
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
            }}
            style={{
              zIndex: petal.zIndex,
              position: 'relative',
            }}
          >
            <div
              className={butterfreeStyles.petalContainer}
              style={{
                [petal.position]: `${petal.positionValue}%`,
                transform: `rotate(${petal.rotation}deg)`,
                width: `${petal.width}em`,
              }}
            >
              {petalsList[petal.petal]}
            </div>
          </motion.div>
        ))}
        <div className={butterfreeStyles.butterfreeHolder}>
          <motion.div
            animate={{
              y: 80,
              transition: {
                y: {
                  delay: 0,
                  duration: 1.4,
                  type: 'tween',
                  repeat: Infinity,
                  repeatType: 'mirror',
                },
              },
            }}
          >
            <Butterfree className={butterfreeStyles.butterfree} />
          </motion.div>
          {isShiny && <ShinySparkle />}
        </div>
      </>
    </CommonWebDoor>
  );
};

export default WebDoor;

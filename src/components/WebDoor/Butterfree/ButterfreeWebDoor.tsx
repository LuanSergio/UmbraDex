import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';

import Butterfree from '@public/webdoor/butterfree/butterfree.svg';
import Petal1 from '@public/webdoor/butterfree/petal-1.svg';
import Petal2 from '@public/webdoor/butterfree/petal-2.svg';
import Petal3 from '@public/webdoor/butterfree/petal-3.svg';
import Petal4 from '@public/webdoor/butterfree/petal-4.svg';
import Petal5 from '@public/webdoor/butterfree/petal-5.svg';
import Petal6 from '@public/webdoor/butterfree/petal-6.svg';
import Petal7 from '@public/webdoor/butterfree/petal-7.svg';
import Petal8 from '@public/webdoor/butterfree/petal-8.svg';
import Petal9 from '@public/webdoor/butterfree/petal-9.svg';

import getRandomNumberBetweenInterval from '@utils/getRandomNumberBetweenInterval';

import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import butterfreeStyles from './butterfree-webdoor.module.scss';

interface Petals {
  value: number;
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
  <Petal9 className={butterfreeStyles.petal} />,
];

const getRandomPetalPosition = (): Petals => {
  const position = Math.random() < 0.5 ? 'right' : 'left';
  const sizeChance = Math.random();
  const value = getRandomNumberBetweenInterval(0, 90);
  const width = sizeChance < 0.4 ? 2 : getRandomNumberBetweenInterval(3, 5);
  const petal = getRandomNumberBetweenInterval(0, 8);
  const zIndex: number = sizeChance < 0.4 ? 0 : 21;
  const rotation = getRandomNumberBetweenInterval(-45, 45);
  const id = nanoid();
  const delay = getRandomNumberBetweenInterval(0, 8);
  const initialHorizontalPosition = getRandomNumberBetweenInterval(0, 600);
  const finalHorizontalPosition = getRandomNumberBetweenInterval(-600, 0);
  const duration = getRandomNumberBetweenInterval(10, 18);

  return {
    value,
    position,
    petal,
    rotation,
    width,
    id,
    zIndex,
    delay,
    initialHorizontalPosition,
    finalHorizontalPosition,
    duration,
  };
};

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();
  const [currentPetals, setCurrentPetals] = useState<Petals[]>([]);

  useEffect(() => {
    const petal: Petals[] = [];

    for (let i = 0; i < 15; i++) {
      petal.push(getRandomPetalPosition());
    }

    setCurrentPetals(petal);
  }, []);

  return (
    <CommonWebDoor
      mainClass={butterfreeStyles.butterfreeWebDoor}
      shinyClass={butterfreeStyles.shiny}
      titlePositionX="right"
      titlePositionY="bottom"
    >
      <>
        {currentPetals.map(petal => (
          <motion.div
            key={petal.id}
            initial={{
              y: -200,
              x: petal.initialHorizontalPosition,
            }}
            animate={{
              y: '100vh',
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
              willChange: 'transform',
            }}
          >
            <div
              className={butterfreeStyles.petalContainer}
              style={{
                [petal.position]: `${petal.value}%`,
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

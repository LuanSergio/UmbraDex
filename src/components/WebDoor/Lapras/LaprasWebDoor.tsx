import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';

import Lapras from '@public/webdoor/lapras/lapras.svg';
import Bubble1 from '@public/webdoor/lapras/bubble-1.svg';
import Bubble2 from '@public/webdoor/lapras/bubble-2.svg';
import Bubble3 from '@public/webdoor/lapras/bubble-3.svg';

import getRandomNumberBetweenInterval from '@utils/getRandomNumberBetweenInterval';

import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import laprasStyles from './lapras-webdoor.module.scss';

interface Bubbles {
  positionValue: number;
  position: string;
  bubble: number;
  rotation: number;
  width: number;
  id: string;
  delay: number;
  duration: number;
}

const bubblesList = [
  <Bubble1 className={laprasStyles.bubble} />,
  <Bubble2 className={laprasStyles.bubble} />,
  <Bubble3 className={laprasStyles.bubble} />,
];

const getRandomBubblePosition = (): Bubbles => {
  const position = Math.random() < 0.5 ? 'right' : 'left';
  const value = getRandomNumberBetweenInterval(0, 90);
  const width = getRandomNumberBetweenInterval(4, 10);
  const bubble = getRandomNumberBetweenInterval(0, bubblesList.length - 1);
  const rotation = getRandomNumberBetweenInterval(-45, 45);
  const id = nanoid();
  const delay = getRandomNumberBetweenInterval(0, 3);
  const duration = getRandomNumberBetweenInterval(6, 12);

  return {
    positionValue: value,
    position,
    bubble,
    rotation,
    width,
    id,
    delay,
    duration,
  };
};

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();
  const [currentBubbles, setCurrentBubbles] = useState<Bubbles[]>([]);

  useEffect(() => {
    const bubble: Bubbles[] = [];

    for (let i = 0; i < 6; i++) {
      bubble.push(getRandomBubblePosition());
    }

    setCurrentBubbles(bubble);
  }, []);

  return (
    <CommonWebDoor
      mainClass={laprasStyles.laprasWebDoor}
      shinyClass={laprasStyles.shiny}
      titlePositionX="left"
      titlePositionY="center"
    >
      <>
        {currentBubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            initial={{
              y: '100vh',
            }}
            animate={{
              y: -200,
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
            }}
          >
            <div
              className={laprasStyles.bubbleContainer}
              style={{
                [bubble.position]: `${bubble.positionValue}%`,
                transform: `rotate(${bubble.rotation}deg)`,
                width: `${bubble.width}em`,
              }}
            >
              {bubblesList[bubble.bubble]}
            </div>
          </motion.div>
        ))}
        <div className={laprasStyles.laprasHolder}>
          <motion.div
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
          >
            <Lapras className={laprasStyles.lapras} />
          </motion.div>
          {isShiny && <ShinySparkle spacingSize="small" />}
        </div>
      </>
    </CommonWebDoor>
  );
};

export default WebDoor;

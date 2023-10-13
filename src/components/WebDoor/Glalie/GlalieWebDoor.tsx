import { motion } from 'framer-motion';
import Glalie from '@public/webdoor/glalie/glalie.svg';
import BigShard from '@public/webdoor/glalie/big-shard.svg';
import SmallShard from '@public/webdoor/glalie/small-shard.svg';
import SnowFlake from '@public/webdoor/glalie/snow-flake.svg';
import ShinySparkle from '@components/ShinySparkle';
import CommonWebDoor from '../CommonWebdoor';
import { useWebDoorContext } from '../WebdoorContext';

import glalieStyles from './glalie-webdoor.module.scss';

interface Snowflakes {
  positionValue: number;
  position: string;
  rotation: number;
  width: number;
  id: string;
  zIndex: number;
  initialHorizontalPosition: number;
  delay: number;
  duration: number;
}

const snowflakes: Snowflakes[] = [
  {
    positionValue: 40,
    position: 'right',
    rotation: 24,
    width: 6.25,
    id: '01',
    zIndex: 21,
    delay: 10,
    initialHorizontalPosition: 0,
    duration: 18,
  },
  {
    positionValue: 0,
    position: 'left',
    rotation: 24,
    width: 7.25,
    id: '01',
    zIndex: 21,
    delay: 0,
    initialHorizontalPosition: 0,
    duration: 22,
  },
  {
    positionValue: 100,
    position: 'left',
    rotation: 45,
    width: 4.25,
    id: '03',
    zIndex: 0,
    delay: 6,
    initialHorizontalPosition: 40,
    duration: 25,
  },
];

const WebDoor = (): JSX.Element => {
  const { isShiny } = useWebDoorContext();

  const shards = (
    <div className={glalieStyles.shardContainer}>
      <motion.div
        transition={{ delay: 0.5, type: 'tween', duration: 0.5 }}
        initial={{ rotate: '-148deg', translateY: '100%', translateX: '-100%' }}
        animate={{ translateY: 0, translateX: 0 }}
        className={glalieStyles.shardBottomLeft}
      >
        <BigShard />
      </motion.div>

      <motion.div
        transition={{ delay: 0.5, type: 'tween', duration: 0.5 }}
        initial={{ rotate: '32deg', translateY: '100%', translateX: '-100%' }}
        animate={{ translateY: 0, translateX: 0 }}
        className={glalieStyles.smallShardBottomLeft}
      >
        <SmallShard />
      </motion.div>

      <motion.div
        transition={{ delay: 0.5, type: 'tween', duration: 0.5 }}
        initial={{ rotate: '-24deg', translateY: '100%', translateX: '100%' }}
        animate={{ translateY: 0, translateX: 0 }}
        className={glalieStyles.smallShardBottomRight}
      >
        <SmallShard />
      </motion.div>

      <motion.div
        transition={{ delay: 0.5, type: 'tween', duration: 0.5 }}
        initial={{ rotate: '148deg', translateY: '100%', translateX: '-00%' }}
        animate={{ translateY: 0, translateX: 0 }}
        className={glalieStyles.shardBottomRight}
      >
        <BigShard />
      </motion.div>

      <motion.div
        transition={{
          delay: 0.5,
          type: 'tween',
          duration: 0.5,
        }}
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      >
        <div className={glalieStyles.shardTopLeft}>
          <BigShard />
        </div>
      </motion.div>

      <motion.div
        transition={{ delay: 0.5, type: 'tween', duration: 0.5 }}
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
      >
        <div className={glalieStyles.shardTopRight}>
          <BigShard />
        </div>
      </motion.div>
    </div>
  );

  return (
    <CommonWebDoor
      beforeContainer={shards}
      mainClass={glalieStyles.glalieWebDoor}
      shinyClass={glalieStyles.shiny}
      titlePositionX="center"
      titlePositionY="top"
    >
      <>
        {snowflakes.map(snowflake => (
          <motion.div
            key={snowflake.id}
            initial={{
              y: -200,
            }}
            animate={{
              y: '200vh',
            }}
            transition={{
              duration: snowflake.duration,
              delay: snowflake.delay,
              repeat: Infinity,
            }}
            className={glalieStyles.snowflakeContainer}
            style={{
              [snowflake.position]: `${snowflake.positionValue}%`,
              transform: `rotate(${snowflake.rotation}deg)`,
              width: `${snowflake.width}em`,
            }}
          >
            <SnowFlake />
          </motion.div>
        ))}

        <div className={glalieStyles.glalieHolder}>
          <motion.div
            initial={{ scale: 0, opacity: 0.01 }}
            animate={{
              y: 32,
              scale: 1,
              opacity: 1,
              transition: {
                y: {
                  delay: 0,
                  duration: 1.4,
                  type: 'tween',
                  repeat: Infinity,
                  repeatType: 'reverse',
                },
                scale: {
                  duration: 0.8,
                },
                opacity: {
                  duration: 1,
                },
              },
            }}
          >
            <Glalie className={glalieStyles.glalie} />
          </motion.div>
          {isShiny && <ShinySparkle />}
        </div>
      </>
    </CommonWebDoor>
  );
};

export default WebDoor;

import { AnimatePresence, motion } from 'framer-motion';

import Koffing from '@public/webdoor/koffing/koffing.svg';
import Sign from '@public/webdoor/koffing/sign.svg';
import SmokeVariation1 from '@public/webdoor/koffing/smoke-variation-1.svg';
import SmokeVariation2 from '@public/webdoor/koffing/smoke-variation-2.svg';
import SmokeVariation3 from '@public/webdoor/koffing/smoke-variation-3.svg';
import SmokeVariation4 from '@public/webdoor/koffing/smoke-variation-4.svg';

import useWindowSize from 'src/hooks/useWindowSize';

import webdoorStyles from './webdoor.module.scss';
import koffingStyles from './koffing-webdoor.module.scss';

const WebDoor = (): JSX.Element => {
  const [windowWidth] = useWindowSize();
  const smokeOpacityAnimation = {
    duration: 1,
    type: 'tween',
    repeat: 'Infinity',
    repeatType: 'mirror',
  };
  const verticalAnimation = {
    type: 'tween',
    repeat: Infinity,
    repeatType: 'mirror',
  };

  const title = (
    <>
      Find everything <br />
      about the creatures <br />
      you love!
    </>
  );

  return (
    <>
      <section
        className={` ${koffingStyles.koffingWebDoor} ${webdoorStyles.webDoor}`}
      >
        <div className={`${webdoorStyles.container} h-container`}>
          <div className={webdoorStyles.titleContainer}>
            <div className={webdoorStyles.titleHolder}>
              <h1 className={`h-title ${webdoorStyles.title}`}>{title}</h1>

              <span
                aria-hidden="true"
                className={`h-title ${webdoorStyles.titleShadow}`}
              >
                {title}
              </span>
            </div>
          </div>

          {windowWidth > 0 && (
            <>
              <div className={koffingStyles.koffingHolder}>
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      opacity: {
                        delay: 2,
                        repeatDelay: 4,
                        ...smokeOpacityAnimation,
                      },
                      y: {
                        delay: 2,
                        duration: 1.2,
                        ...verticalAnimation,
                      },
                    },
                  }}
                  exit={{ opacity: 0 }}
                >
                  <SmokeVariation1
                    className={koffingStyles.leftSmokeVariation1}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      opacity: {
                        delay: 3,
                        repeatDelay: 4,
                        ...smokeOpacityAnimation,
                      },
                      y: {
                        delay: 3,
                        duration: 3,
                        ...verticalAnimation,
                      },
                    },
                  }}
                >
                  <SmokeVariation2
                    className={koffingStyles.leftSmokeVariation2}
                  />
                </motion.div>

                <motion.div
                  transition={{
                    delay: windowWidth > 1280 ? 0.85 : 0,
                    type: 'tween',
                    duration: 0.75,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      opacity: {
                        delay: 3,
                        repeatDelay: 3,
                        ...smokeOpacityAnimation,
                      },
                      y: {
                        delay: 3,
                        duration: 3,
                        ...verticalAnimation,
                      },
                    },
                  }}
                >
                  <SmokeVariation3
                    className={koffingStyles.leftSmokeVariation3}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      opacity: {
                        delay: 4,
                        repeatDelay: 4,
                        ...smokeOpacityAnimation,
                      },
                      y: {
                        delay: 1,
                        duration: 2.8,
                        ...verticalAnimation,
                      },
                    },
                  }}
                >
                  <SmokeVariation4
                    className={koffingStyles.leftSmokeVariation4}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      opacity: {
                        delay: 2.5,
                        repeatDelay: 3,
                        ...smokeOpacityAnimation,
                      },
                      y: {
                        delay: 2,
                        duration: 1.2,
                        ...verticalAnimation,
                      },
                    },
                  }}
                  exit={{ opacity: 0 }}
                >
                  <SmokeVariation1
                    className={koffingStyles.rightSmokeVariation1}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      opacity: {
                        delay: 5,
                        repeatDelay: 4,
                        ...smokeOpacityAnimation,
                      },
                      y: {
                        delay: 3,
                        duration: 3,
                        ...verticalAnimation,
                      },
                    },
                  }}
                >
                  <SmokeVariation2
                    className={koffingStyles.rightSmokeVariation2}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      opacity: {
                        delay: 2.5,
                        repeatDelay: 3,
                        ...smokeOpacityAnimation,
                      },
                      y: {
                        delay: 2.5,
                        duration: 3,
                        ...verticalAnimation,
                      },
                    },
                  }}
                >
                  <SmokeVariation3
                    className={koffingStyles.rightSmokeVariation3}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      opacity: {
                        delay: 4,
                        repeatDelay: 4,
                        ...smokeOpacityAnimation,
                      },
                      y: {
                        delay: 4,
                        duration: 3,
                        ...verticalAnimation,
                      },
                    },
                  }}
                >
                  <SmokeVariation4
                    className={koffingStyles.rightSmokeVariation4}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 20,
                    transition: {
                      y: {
                        delay: 2,
                        duration: 5,
                        ...verticalAnimation,
                      },
                    },
                  }}
                >
                  <Koffing className={koffingStyles.koffing} />
                </motion.div>
              </div>
              <motion.div
                transition={{
                  delay: 0.85,
                  type: 'tween',
                  duration: 0.75,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Sign className={koffingStyles.sign} />
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default WebDoor;

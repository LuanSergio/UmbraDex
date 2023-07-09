import { motion } from 'framer-motion';

import Koffing from '@public/webdoor/koffing/koffing.svg';
import Sign from '@public/webdoor/koffing/sign.svg';
import Zubat from '@public/webdoor/gengar/zubat.svg';

import useWindowSize from 'src/hooks/useWindowSize';

import webdoorStyles from './webdoor.module.scss';
import koffingWebdoorStyles from './koffing-webdoor.module.scss';

const WebDoor = (): JSX.Element => {
  const [windowWidth] = useWindowSize();

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
        className={`${koffingWebdoorStyles.gengarWebDoor} ${webdoorStyles.webDoor}`}
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
              <motion.div
                transition={{
                  delay: windowWidth > 1280 ? 0.85 : 0,
                  type: 'tween',
                  duration: 0.75,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Koffing className={koffingWebdoorStyles.koffing} />
              </motion.div>

              <motion.div
                transition={{
                  delay: windowWidth > 1280 ? 0.85 : 0,
                  type: 'tween',
                  duration: 0.75,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Sign className={koffingWebdoorStyles.sign} />
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default WebDoor;

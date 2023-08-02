import IconButton from '@components/IconButton';
import RefreshIcon from '@public/icons/refresh.svg';
import ShinyIcon from '@public/icons/shiny.svg';
import Title from './Title';

import { useWebDoorContext } from './WebdoorContext';

import webDoorStyles from './webdoor.module.scss';

interface CommonWebDoorProps {
  shinyClass: string;
  mainClass: string;
  children: JSX.Element;
}

const CommonWebDoor = ({
  mainClass,
  shinyClass,
  children,
}: CommonWebDoorProps): JSX.Element => {
  const { isKonamiCodeActive, isShiny, randomWebDoor, toggleIsShiny } =
    useWebDoorContext();

  return (
    <>
      <div
        className={`${isShiny ? `shiny ${shinyClass}` : ''} $ ${mainClass} ${
          webDoorStyles.commonWebDoor
        }`}
      >
        <div className={`${webDoorStyles.container} h-container`}>
          <div className={webDoorStyles.actionsContainer}>
            <div className={webDoorStyles.actions}>
              <IconButton
                theme="transparent"
                label="Switch pokemon!"
                props={{ onClick: randomWebDoor }}
              >
                <RefreshIcon className={webDoorStyles.refreshIcon} />
              </IconButton>

              {isKonamiCodeActive && (
                <IconButton
                  theme="transparent"
                  label="Switch pokemon!"
                  props={{ onClick: toggleIsShiny }}
                >
                  <ShinyIcon className={webDoorStyles.shinyIcon} />
                </IconButton>
              )}
            </div>
          </div>
          <Title />

          {children}
        </div>
      </div>
    </>
  );
};

export default CommonWebDoor;

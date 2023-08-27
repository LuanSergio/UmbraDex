import IconButton from '@components/IconButton';
import RefreshIcon from '@public/icons/refresh.svg';
import ShinyIcon from '@public/icons/shiny.svg';
import Title, {
  WebDoorTitlePositionXOptions,
  WebDoorTitlePositionYOptions,
} from './WebDoorTitle';

import { useWebDoorContext } from './WebdoorContext';

import webDoorStyles from './webdoor.module.scss';

interface CommonWebDoorProps {
  shinyClass: string;
  mainClass: string;
  children: JSX.Element;
  titlePositionX?: WebDoorTitlePositionXOptions;
  titlePositionY?: WebDoorTitlePositionYOptions;
  beforeContainer?: JSX.Element;
}

const CommonWebDoor = ({
  mainClass,
  shinyClass,
  children,
  titlePositionX,
  titlePositionY,
  beforeContainer,
}: CommonWebDoorProps): JSX.Element => {
  const {
    isKonamiCodeActive,
    isShiny,
    handleRandomWebdoorClick,
    toggleIsShiny,
  } = useWebDoorContext();

  return (
    <>
      <div
        className={`${isShiny ? `shiny ${shinyClass}` : ''} $ ${mainClass} ${
          webDoorStyles.commonWebDoor
        }`}
      >
        {beforeContainer && <>{beforeContainer}</>}

        <div className={`${webDoorStyles.container} h-container`}>
          <div className={webDoorStyles.actionsContainer}>
            <div className={webDoorStyles.actions}>
              <IconButton
                theme="transparent"
                label="Switch pokemon!"
                props={{ onClick: handleRandomWebdoorClick }}
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
          <Title positionX={titlePositionX} positionY={titlePositionY} />

          {children}
        </div>
      </div>
    </>
  );
};

export default CommonWebDoor;

// import IconButton from '@components/IconButton';
// import RefreshIcon from '@public/icons/refresh.svg';
import Title from './Title';

import webdoorStyles from './webdoor.module.scss';

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
  return (
    <>
      <section
        className={`shiny ${shinyClass} ${mainClass} ${webdoorStyles.webDoor}`}
      >
        <div className={`${webdoorStyles.container} h-container`}>
          {/* <div className={webdoorStyles.refreshIconContainer}>
            <IconButton theme="transparent" label="Switch pokemon!">
              <RefreshIcon className={webdoorStyles.refreshIcon} />
            </IconButton>
          </div> */}
          <Title />

          {children}
        </div>
      </section>
    </>
  );
};

export default CommonWebDoor;

import WebDoorTitle from './WebDoorTitle';
import { useWebDoorContext } from './WebdoorContext';
import webDoorStyles from './webdoor.module.scss';

const WebDoor = (): JSX.Element => {
  const { currentWebDoor } = useWebDoorContext();

  return <section className={webDoorStyles.webDoor}>{currentWebDoor}</section>;
};

export default WebDoor;

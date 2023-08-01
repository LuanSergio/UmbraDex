import { useWebDoorContext } from './WebdoorContext';

const WebDoor = (): JSX.Element => {
  const { currentWebDoor } = useWebDoorContext();

  return <>{currentWebDoor}</>;
};

export default WebDoor;

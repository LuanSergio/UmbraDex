import { useEffect, useState } from 'react';

import createRandomNumber from '@utils/createRandomNumber';

import KoffingWebdoor from './Koffing/KoffingWebdoor';
import GengarWebdoor from './Gengar/GengarWebDoor';

const webDoorList = [<GengarWebdoor />, <KoffingWebdoor />];

const WebDoor = (): JSX.Element => {
  const [randomWebdoor, setRandomWebdoor] = useState<JSX.Element | undefined>();

  useEffect(() => {
    const randomIndex = createRandomNumber(webDoorList.length) - 1;

    setRandomWebdoor(webDoorList[randomIndex]);
  }, []);

  return <>{randomWebdoor}</>;
};

export default WebDoor;

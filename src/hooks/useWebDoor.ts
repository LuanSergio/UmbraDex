import { useEffect, useState } from 'react';
import createRandomNumber from '@utils/createRandomNumber';

const webDoorList = ['gengar', 'koffing'];

interface UseWebDoorResponse {
  getRandomWebDoor: () => void;
}

const useWebDoor = (): string => {
  const [randomWebdoor, setRandomWebdoor] = useState<string>();

  useEffect(() => {
    const randomIndex = createRandomNumber(webDoorList.length) - 1;

    setRandomWebdoor(webDoorList[randomIndex]);
  }, []);

  return randomWebdoor;
};

export default useWebDoor;

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import createRandomNumber from '@utils/createRandomNumber';
import useKonamiCode from '@hooks/useKonamiCode';
import SecretAudio from '../../../public/audio/secret.mp3';

import KoffingWebdoor from './Koffing/KoffingWebdoor';
import GengarWebdoor from './Gengar/GengarWebDoor';

interface WebDoorContextData {
  currentWebDoor: JSX.Element;
  isShiny: boolean;
  toggleIsShiny: () => void;
  randomWebDoor: () => void;
}

interface WebDoorContextProviderProps {
  children: ReactNode;
}

const webDoorList = [
  <GengarWebdoor />,
  <KoffingWebdoor />,
  <GengarWebdoor />,
  <KoffingWebdoor />,
];

export const WebDoorContext = createContext({} as WebDoorContextData);

export function WebDoorContextProvider({
  children,
}: WebDoorContextProviderProps) {
  const [currentWebDoor, setCurrentWebDoor] = useState<JSX.Element>();
  const [hasKonamiCode, setHasKonamiCode] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  const currentWebDoorList = useRef([...webDoorList]);
  const webDoorIndex = useRef(0);

  const randomWebDoor = useCallback(() => {
    if (currentWebDoorList.current.length === 1) {
      currentWebDoorList.current = webDoorList.filter((item, index) => {
        return webDoorIndex.current !== index;
      });
    }

    const randomIndex =
      createRandomNumber(currentWebDoorList.current.length) - 1;

    webDoorIndex.current = randomIndex;

    setCurrentWebDoor(currentWebDoorList.current[randomIndex]);

    currentWebDoorList.current.splice(randomIndex, 1);
  }, [currentWebDoorList, setCurrentWebDoor]);

  const toggleIsShiny = useCallback(() => {
    setIsShiny(previousValue => !previousValue);
  }, []);

  const activateShiny = useCallback(() => {
    setIsShiny(true);
  }, []);

  const activateKonamiCode = useCallback(() => {
    if (hasKonamiCode) {
      return;
    }
    const audio = new Audio(SecretAudio);
    setHasKonamiCode(true);
    activateShiny();
    audio.play();
  }, [activateShiny, hasKonamiCode]);

  useEffect(() => {
    randomWebDoor();
  }, [randomWebDoor]);

  useKonamiCode(activateKonamiCode);

  const contextValue = useMemo(
    () => ({
      currentWebDoor,
      isShiny,
      toggleIsShiny,
      randomWebDoor,
    }),
    [currentWebDoor, isShiny, randomWebDoor, toggleIsShiny],
  );

  return (
    <WebDoorContext.Provider value={contextValue}>
      {children}
    </WebDoorContext.Provider>
  );
}

export const useWebDoorContext = () => useContext(WebDoorContext);

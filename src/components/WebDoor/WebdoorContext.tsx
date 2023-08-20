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
import ShinyAudio from '../../../public/audio/shiny.mp3';

import KoffingWebdoor from './Koffing/KoffingWebDoor';
import GengarWebdoor from './Gengar/GengarWebDoor';
import ButterfreeWebdoor from './Butterfree/ButterfreeWebDoor';
import LaprasWebdoor from './Lapras/LaprasWebDoor';

interface WebDoorContextData {
  currentWebDoor: JSX.Element;
  isShiny: boolean;
  isKonamiCodeActive: boolean;
  toggleIsShiny: () => void;
  randomWebDoor: () => void;
}

interface WebDoorContextProviderProps {
  children: ReactNode;
}

const webDoorList = [
  <GengarWebdoor />,
  <KoffingWebdoor />,
  <ButterfreeWebdoor />,
  <LaprasWebdoor />,
];

export const WebDoorContext = createContext({} as WebDoorContextData);

export function WebDoorContextProvider({
  children,
}: WebDoorContextProviderProps) {
  const [currentWebDoor, setCurrentWebDoor] = useState<JSX.Element>();
  const [isKonamiCodeActive, setIsKonamiCodeActive] = useState(false);
  const [isShiny, setIsShiny] = useState(false);

  const currentWebDoorList = useRef([...webDoorList]);
  const previousWebDoor = useRef(0);

  const randomWebDoor = useCallback(() => {
    if (currentWebDoorList.current.length === 0) {
      currentWebDoorList.current = [...webDoorList];
    }

    let randomIndex;
    let selectedWebDoor;

    do {
      randomIndex = Math.floor(
        Math.random() * currentWebDoorList.current.length,
      );
      selectedWebDoor = currentWebDoorList.current[randomIndex];
    } while (selectedWebDoor === previousWebDoor.current);

    currentWebDoorList.current.splice(randomIndex, 1);

    previousWebDoor.current = selectedWebDoor;
    setCurrentWebDoor(selectedWebDoor);
  }, [currentWebDoorList, setCurrentWebDoor]);

  const toggleIsShiny = useCallback(() => {
    setIsShiny(previousValue => !previousValue);
  }, []);

  const activateShiny = useCallback(() => {
    setIsShiny(true);
  }, []);

  const activateKonamiCode = useCallback(() => {
    if (isKonamiCodeActive) {
      return;
    }
    const audio = new Audio(SecretAudio);
    setIsKonamiCodeActive(true);
    activateShiny();
    document.cookie = 'umbradex-activate-shiny=true; path=/';
    audio.play();
  }, [activateShiny, isKonamiCodeActive]);

  useEffect(() => {
    randomWebDoor();
  }, [randomWebDoor]);

  useKonamiCode(activateKonamiCode);

  useEffect(() => {
    const cookieExists = document.cookie.includes(
      'umbradex-activate-shiny=true',
    );

    if (cookieExists) {
      setIsShiny(true);
      setIsKonamiCodeActive(true);
    }
  }, []);

  useEffect(() => {
    if (isKonamiCodeActive) {
      return;
    }

    // const chance = 1 / 40.96;
    const chance = 1 / 20.48;
    const randomNumber = Math.random();

    if (randomNumber <= chance) {
      setIsShiny(true);
      const audio = new Audio(ShinyAudio);
      audio.play();
      return;
    }

    setIsShiny(false);
  }, [currentWebDoor, isKonamiCodeActive]);

  const contextValue = useMemo(
    () => ({
      currentWebDoor,
      isShiny,
      isKonamiCodeActive,
      toggleIsShiny,
      randomWebDoor,
    }),
    [currentWebDoor, isShiny, isKonamiCodeActive, randomWebDoor, toggleIsShiny],
  );

  return (
    <WebDoorContext.Provider value={contextValue}>
      {children}
    </WebDoorContext.Provider>
  );
}

export const useWebDoorContext = () => useContext(WebDoorContext);

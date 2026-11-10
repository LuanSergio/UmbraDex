import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

type InstallOutcome = 'accepted' | 'dismissed' | 'unavailable';

interface PwaContextData {
  /** True when the install entry should be shown to the user. */
  canInstall: boolean;
  /** True when the app is already running as an installed PWA. */
  isInstalled: boolean;
  /**
   * iOS/iPadOS browsers have no install prompt API, so the user needs manual
   * "Add to Home Screen" instructions instead.
   */
  needsManualInstall: boolean;
  promptInstall: () => Promise<InstallOutcome>;
}

interface PwaContextProviderProps {
  children: ReactNode;
}

const SERVICE_WORKER_URL = '/sw.js';

export const PwaContext = createContext({} as PwaContextData);

function isRunningStandalone(): boolean {
  const iosStandalone = (navigator as Navigator & { standalone?: boolean })
    .standalone;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    iosStandalone === true
  );
}

function isAppleMobileDevice(): boolean {
  const { userAgent, platform, maxTouchPoints } = navigator;

  return (
    /iphone|ipad|ipod/i.test(userAgent) ||
    // iPadOS reports itself as a Mac
    (platform === 'MacIntel' && maxTouchPoints > 1)
  );
}

export function PwaContextProvider({
  children,
}: PwaContextProviderProps): JSX.Element {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isAppleMobile, setIsAppleMobile] = useState(false);

  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      !('serviceWorker' in navigator)
    ) {
      return;
    }

    navigator.serviceWorker
      .register(SERVICE_WORKER_URL, { scope: '/' })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Service worker registration failed:', error);
      });
  }, []);

  useEffect(() => {
    setIsInstalled(isRunningStandalone());
    setIsAppleMobile(isAppleMobileDevice());

    const displayModeQuery = window.matchMedia('(display-mode: standalone)');

    function handleBeforeInstallPrompt(event: Event) {
      // Prevent the browser mini-infobar; installation is offered from the menu.
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    }

    function handleAppInstalled() {
      setIsInstalled(true);
      setInstallPromptEvent(null);
    }

    function handleDisplayModeChange(event: MediaQueryListEvent) {
      setIsInstalled(event.matches);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    displayModeQuery.addEventListener?.('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
      displayModeQuery.removeEventListener?.('change', handleDisplayModeChange);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<InstallOutcome> => {
    if (!installPromptEvent) return 'unavailable';

    await installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;

    // The event can only be used once.
    setInstallPromptEvent(null);

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    return outcome;
  }, [installPromptEvent]);

  const needsManualInstall = !isInstalled && isAppleMobile;
  const canInstall =
    !isInstalled && (installPromptEvent !== null || needsManualInstall);

  const value = useMemo(
    () => ({ canInstall, isInstalled, needsManualInstall, promptInstall }),
    [canInstall, isInstalled, needsManualInstall, promptInstall],
  );

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
}

export const usePwaContext = () => useContext(PwaContext);

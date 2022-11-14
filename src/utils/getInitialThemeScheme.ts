export default function getInitialThemeScheme() {
  const persistedColorPreference = window.localStorage.getItem('color-mode');
  const hasPersistedPreference = typeof persistedColorPreference === 'string';

  if (hasPersistedPreference) {
    return persistedColorPreference;
  }

  const mediaQueryPreference = window.matchMedia(
    '(prefers-color-scheme: dark)',
  );
  const hasMediaQueryPreference =
    typeof mediaQueryPreference.matches === 'boolean';

  if (hasMediaQueryPreference) {
    return mediaQueryPreference.matches ? 'dark' : 'light';
  }

  return 'light';
}

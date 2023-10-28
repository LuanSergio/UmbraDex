import NextLink from 'next/link';
import { RemoveScroll } from 'react-remove-scroll';

import styles from './styles.module.scss';

interface InnerPageNavigationProps {
  previous: string;
  next: string;
  disablePrevious?: boolean;
  disableNext?: boolean;
}

const InnerPageNavigation = ({
  previous,
  next,
  disablePrevious,
  disableNext,
}: InnerPageNavigationProps): JSX.Element => {
  return (
    <div className={styles.navigation}>
      <div className={RemoveScroll.classNames.fullWidth}>
        <div className={styles.navigationContainer}>
          {disablePrevious ? (
            <button
              type="button"
              disabled={disablePrevious}
              aria-label="Previous pokemon"
              title="Previous pokemon"
              className={styles.previous}
            />
          ) : (
            <NextLink href={previous}>
              <button
                type="button"
                disabled={disablePrevious}
                aria-label="Previous pokemon"
                title="Previous pokemon"
                className={styles.previous}
              />
            </NextLink>
          )}

          {disableNext ? (
            <button
              type="button"
              disabled={disableNext}
              aria-label="Next pokemon"
              title="Next pokemon"
              className={styles.next}
            />
          ) : (
            <NextLink href={next}>
              <button
                type="button"
                disabled={disableNext}
                aria-label="Next pokemon"
                title="Next pokemon"
                className={styles.next}
              />
            </NextLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default InnerPageNavigation;

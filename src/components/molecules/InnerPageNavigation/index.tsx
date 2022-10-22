import NextLink from 'next/link';
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
      <NextLink href={previous}>
        <button
          type="button"
          disabled={disablePrevious}
          aria-label="Previous pokemon"
          title="Previous pokemon"
          className={styles.previous}
        />
      </NextLink>

      <NextLink href={next}>
        <button
          type="button"
          disabled={disableNext}
          aria-label="Next pokemon"
          title="Next pokemon"
          className={styles.next}
        />
      </NextLink>
    </div>
  );
};

export default InnerPageNavigation;

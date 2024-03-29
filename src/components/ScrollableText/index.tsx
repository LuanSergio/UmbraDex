import { ReactNode, useEffect, useRef, useState } from 'react';

import getElementHeight from '@utils/getElementHeight';

import styles from './styles.module.scss';

interface ScrollableTextProps {
  children: ReactNode;
  maxHeight: number;
  shouldChange?: unknown;
}

const ScrollableText = ({
  children,
  shouldChange,
  maxHeight,
}: ScrollableTextProps): JSX.Element => {
  const [height, setHeight] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setHeight(getElementHeight(textRef.current));
  }, [shouldChange]);

  return (
    <>
      <div
        className={`${styles.scrollableText} ${
          height > maxHeight ? styles.scrollableTextOverflowContained : ''
        }`}
      >
        <div
          className={
            height > maxHeight
              ? `${styles.scrollableTextContentContained} h-neutral-scroll`
              : ''
          }
          style={{ maxHeight: `${maxHeight}px` }}
        >
          <div ref={textRef}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ScrollableText;

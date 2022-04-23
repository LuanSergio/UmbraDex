import { ReactNode, useEffect, useRef, useState } from 'react';

import getElementHeight from '@utils/getElementHeight';

import styles from './styles.module.scss';

interface IScrollableTextProps {
  children: ReactNode;
  maxHeight: number;
  shouldChange?: unknown;
}

const ScrollableText = ({
  children,
  shouldChange,
  maxHeight,
}: IScrollableTextProps): JSX.Element => {
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
          ref={textRef}
          className={
            height > maxHeight ? styles.scrollableTextContentContained : ''
          }
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ScrollableText;

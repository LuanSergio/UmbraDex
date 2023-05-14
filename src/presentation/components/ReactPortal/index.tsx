import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import createWrapperAndAppendToBody from '@utils/createWrapperAndAppendToBody';

interface ReactPortal {
  children: ReactNode;
  wrapperId?: string;
}

export default function ReactPortal({
  children,
  wrapperId = 'react-portal-wrapper',
}: ReactPortal) {
  const wrapperRef = useRef<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let element = document.getElementById(wrapperId);

    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }

    wrapperRef.current = element;

    setMounted(true);
  }, [wrapperId]);

  return mounted ? createPortal(children, wrapperRef.current) : null;
}

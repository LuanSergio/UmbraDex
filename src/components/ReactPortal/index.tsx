import createWrapperAndAppendToBody from '@utils/createWrapperAndAppendToBody';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface IReactPortal {
  children: ReactNode;
  wrapperId?: string;
}

export default function ReactPortal({
  children,
  wrapperId = 'react-portal-wrapper',
}: IReactPortal) {
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

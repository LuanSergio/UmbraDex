import { ReactNode, MouseEvent, HTMLProps } from 'react';

import styles from './styles.module.scss';

interface ICarouselItem {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
  onClick?: (...args: unknown[]) => unknown;
  buttonProps?: HTMLProps<HTMLButtonElement>;
}

let position = 0;
let initialPosition = 0;

function handleMouseDown(event: MouseEvent): void {
  initialPosition = event.clientX;
}

function handleMouseUp(event: MouseEvent) {
  position = event.clientX;
}

const CarouselItem = ({
  children,
  tagName,
  onClick,
  buttonProps,
}: ICarouselItem): JSX.Element => {
  const Tag = (tagName as keyof JSX.IntrinsicElements) ?? 'div';

  function handleClick(): void {
    if (position === initialPosition) {
      onClick();
    }
  }

  return (
    <Tag>
      {onClick ? (
        <button
          {...buttonProps}
          type="button"
          className={styles.carouselItemButton}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {children}
        </button>
      ) : (
        <>{children}</>
      )}
    </Tag>
  );
};

export default CarouselItem;

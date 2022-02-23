import { ReactNode, MouseEvent } from 'react';
import styles from './styles.module.scss';

interface ICarouselItem {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
  onClick?: (...args: unknown[]) => any;
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
          type="button"
          className={styles.carouselItemButton}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {children}
        </button>
      ) : (
        { children }
      )}
    </Tag>
  );
};

export default CarouselItem;

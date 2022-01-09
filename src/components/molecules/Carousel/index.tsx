import { Children, ReactNode, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import useCarousel from './hook';

interface CarouselProps {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
  carouselDescription?: string;
  itemWidth: number;
  gap?: number;
}

const Carousel = ({
  children,
  tagName = 'div',
  carouselDescription,
  itemWidth,
  gap = 30,
}: CarouselProps): JSX.Element => {
  const totalItemWidth = itemWidth + gap;
  const itemsQuantity = Children.count(children);

  const Tag = tagName as keyof JSX.IntrinsicElements;
  const carouselRef = useRef<HTMLDivElement>(null);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    goToPreviousIndex,
    goToNextIndex,
  } = useCarousel({ carouselRef, totalItemWidth, itemsQuantity });

  useEffect(() => {
    carouselRef.current?.style.setProperty('--carousel-gap', `${gap}px`);
  }, [gap]);

  return (
    <div className={styles.carouselHolder}>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goToPreviousIndex}
        className={styles.previous}
      />

      <div
        role="presentation"
        className={styles.carousel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        aria-roledescription="carousel"
        aria-label={carouselDescription}
      >
        <div className={styles.carouselWrapper} ref={carouselRef}>
          <Tag
            className={styles.carouselItemsHolder}
            aria-atomic="false"
            aria-live="polite"
          >
            {children}
          </Tag>
        </div>
      </div>

      <button
        type="button"
        className={styles.next}
        aria-label="Next slide"
        onClick={goToNextIndex}
      />
    </div>
  );
};

export default Carousel;

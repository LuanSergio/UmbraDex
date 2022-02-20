import { Children, ReactNode, useRef } from 'react';
import styles from './styles.module.scss';
import useCarousel from './hook';

interface ICarouselProps {
  children: ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
  carouselDescription?: string;
  itemWidth: number | number[];
  gap?: number;
  maxItems?: number;
  myIndex: number;
  updateMyIndex: (index: number) => void;
}

const Carousel = ({
  children,
  tagName = 'div',
  carouselDescription,
  itemWidth,
  gap = 30,
  maxItems = 4,
  myIndex,
  updateMyIndex,
}: ICarouselProps): JSX.Element => {
  const itemsQuantity = Children.count(children);

  const Tag = (tagName as keyof JSX.IntrinsicElements) ?? 'div';
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    goToPreviousIndex,
    goToNextIndex,
  } = useCarousel({
    carouselRef,
    carouselWrapperRef,
    itemWidth,
    itemsQuantity,
    gap,
    maxItems,
    myIndex,
    updateMyIndex,
  });

  return (
    <>
      {itemsQuantity > maxItems ? (
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
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            aria-roledescription="carousel"
            aria-label={carouselDescription}
          >
            <div className={styles.carouselWrapper} ref={carouselWrapperRef}>
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
      ) : (
        <div ref={carouselWrapperRef}>
          <Tag
            className={styles.carouselItemsHolder}
            aria-atomic="false"
            aria-live="polite"
          >
            {children}
          </Tag>
        </div>
      )}
    </>
  );
};

export default Carousel;

import { Children, ReactNode, useEffect, useRef, useState } from 'react';
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
  const [itemsQuantity, setItemsQuantity] = useState(Children.count(children));

  const Tag = (tagName as keyof JSX.IntrinsicElements) ?? 'div';
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItemsQuantity(Children.count(children));
  }, [children]);

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

  const carouselProps = {
    className: styles.carousel,
    ref: carouselRef,
    role: 'presentation',
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onTouchMove: (e: unknown) => handleMouseMove(e as TouchEvent),
    onTouchStart: (e: unknown) => handleMouseDown(e as TouchEvent),
    onTouchEnd: (e: unknown) => handleMouseUp(e as TouchEvent),
    'aria-roledescription': 'carousel',
    'aria-label': carouselDescription,
  };

  return (
    <>
      <div className={styles.carouselHolder}>
        {itemsQuantity > maxItems && (
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goToPreviousIndex}
            className={styles.previous}
          />
        )}

        <div {...(itemsQuantity > maxItems ? carouselProps : undefined)}>
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

        {itemsQuantity > maxItems && (
          <button
            type="button"
            className={styles.next}
            aria-label="Next slide"
            onClick={goToNextIndex}
          />
        )}
      </div>
    </>
  );
};

export default Carousel;

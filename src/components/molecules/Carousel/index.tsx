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
  currentIndex: number;
  updateCurrentIndex: (index: number) => void;
  large?: boolean;
  maxPositionIndex?: 'auto' | number | 'none';
}

const Carousel = ({
  children,
  tagName = 'div',
  carouselDescription,
  itemWidth,
  gap = 30,
  maxItems = 4,
  large = false,
  currentIndex,
  updateCurrentIndex,
  maxPositionIndex = 'none',
}: ICarouselProps): JSX.Element => {
  const [itemsQuantity, setItemsQuantity] = useState(Children.count(children));
  const [maxPositionIndexState, setMaxPositionIndexState] =
    useState(maxPositionIndex);

  const Tag = (tagName as keyof JSX.IntrinsicElements) ?? 'div';
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItemsQuantity(Children.count(children));
  }, [children]);

  useEffect(() => {
    if (maxPositionIndex === 'auto') {
      setMaxPositionIndexState(itemsQuantity - maxItems);
      console.log('case 1');
    } else if (maxPositionIndex === 'none') {
      setMaxPositionIndexState(itemsQuantity - 1);
      console.log('case 2');
    } else {
      setMaxPositionIndexState(maxPositionIndex);
      console.log('case 3');
    }
  }, [itemsQuantity, maxItems, maxPositionIndex]);

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
    currentIndex,
    updateCurrentIndex,
    maxPositionIndex: maxPositionIndexState,
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
            disabled={currentIndex === 0}
            className={`${styles.previous} ${large ? styles.large : ''}`}
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
            className={`${styles.next} ${large ? styles.large : ''}`}
            aria-label="Next slide"
            disabled={currentIndex === itemsQuantity - 1}
            onClick={goToNextIndex}
          />
        )}
      </div>
    </>
  );
};

export default Carousel;

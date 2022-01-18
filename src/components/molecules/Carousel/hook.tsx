import { RefObject, useEffect } from 'react';

interface IUseCarouselParams {
  carouselRef: RefObject<HTMLDivElement>;
  carouselWrapperRef: RefObject<HTMLDivElement>;
  itemWidth: number | number[];
  itemsQuantity: number;
  gap: number;
  maxItems: number;
  animationDuration?: number;
}

interface IUseCarouselResponse {
  handleMouseDown: (event: React.MouseEvent) => void;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseUp: (event: React.MouseEvent) => void;
  handleMouseLeave: (event: React.MouseEvent) => void;
  goToPreviousIndex: () => void;
  goToNextIndex: () => void;
}

let index = 0;
let initialPosition = 0;
let lastPosition = 0;
let position = 0;
let isMouseLocked = false;

const useCarousel = ({
  carouselRef,
  carouselWrapperRef,
  itemWidth,
  itemsQuantity,
  gap,
  maxItems,
  animationDuration = 300,
}: IUseCarouselParams): IUseCarouselResponse => {
  const isItemWidthAnArray = Array.isArray(itemWidth);

  const totalItemWidth = isItemWidthAnArray
    ? itemWidth[0] + gap
    : itemWidth + gap;
  const minIndex = 0;
  const maxIndex = itemsQuantity - 1;
  const minPosition = 0;
  const maxPosition = (itemsQuantity - 1) * totalItemWidth;

  useEffect(() => {
    const width =
      isItemWidthAnArray && itemWidth.length > 0
        ? itemWidth
            .slice(0, maxItems)
            .reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue + gap,
            )
        : maxItems * totalItemWidth - gap;

    carouselRef.current?.style.setProperty('--carousel-max-size', `${width}px`);
  }, [
    carouselRef,
    maxItems,
    itemWidth,
    gap,
    isItemWidthAnArray,
    totalItemWidth,
  ]);

  useEffect(() => {
    carouselWrapperRef.current?.style.setProperty('--carousel-gap', `${gap}px`);
  }, [gap, carouselWrapperRef]);

  async function updateCarouselPosition(newPosition: number): Promise<void> {
    await carouselWrapperRef.current?.style.setProperty(
      '--carousel-position',
      `${newPosition}px`,
    );
    const width = isItemWidthAnArray ? itemWidth[index] + gap : itemWidth + gap;
    index = Math.abs(Math.round(newPosition / width));
  }

  function setCarouselAnimationDuration() {
    carouselWrapperRef.current?.style.setProperty(
      'transition-duration',
      `${animationDuration}ms`,
    );
  }

  function removeCarouselAnimationDuration() {
    setTimeout(() => {
      carouselWrapperRef.current?.style.setProperty(
        'transition-duration',
        `0ms`,
      );
    }, animationDuration);
  }

  async function updateCarouselIndex(newPosition: number): Promise<void> {
    setCarouselAnimationDuration();
    await updateCarouselPosition(newPosition);
    removeCarouselAnimationDuration();
  }

  function handleMouseDown(event: React.MouseEvent): void {
    event.preventDefault();
    isMouseLocked = true;
    initialPosition = event.clientX;
  }

  function handleMouseMove(event: React.MouseEvent): void {
    if (isMouseLocked) {
      const travelDistance = event.clientX - initialPosition;

      const newPosition = travelDistance + lastPosition;

      if (
        newPosition >= -Math.abs(maxPosition) &&
        newPosition <= -Math.abs(minPosition)
      ) {
        position = newPosition;
        updateCarouselPosition(position);
      }
    }
  }

  function handleMouseUp(event: React.MouseEvent): void {
    event.preventDefault();
    lastPosition = position;
    isMouseLocked = false;
    const width = isItemWidthAnArray ? itemWidth[index] + gap : itemWidth + gap;
    updateCarouselIndex(-(index * width));
    lastPosition = -(index * width);
  }

  function handleMouseLeave(): void {
    isMouseLocked = false;
  }

  function goToPreviousIndex(): void {
    if (index > minIndex) {
      const totalWidth = isItemWidthAnArray
        ? itemWidth[index] + gap
        : itemWidth + gap;

      const newPosition = lastPosition + totalWidth;

      updateCarouselIndex(newPosition);
      lastPosition = newPosition;

      index -= 1;
    }
  }

  function goToNextIndex(): void {
    if (index < maxIndex) {
      const totalWidth = isItemWidthAnArray
        ? itemWidth[index] + gap
        : itemWidth + gap;

      const newPosition = lastPosition - totalWidth;

      updateCarouselIndex(newPosition);
      lastPosition = newPosition;
      index += 1;
    }
  }

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    goToPreviousIndex,
    goToNextIndex,
  };
};

export default useCarousel;

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
  const minIndex = 1;
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

  async function updateCarouselIndex(newIndex: number): Promise<void> {
    setCarouselAnimationDuration();

    if (index > newIndex) {
      const totalWidth = isItemWidthAnArray
        ? itemWidth[newIndex] + gap
        : itemWidth + gap;
      const newPosition = lastPosition + totalWidth;
      await updateCarouselPosition(newPosition);
      lastPosition = newPosition;
    } else {
      const totalWidth = isItemWidthAnArray
        ? itemWidth[index] + gap
        : itemWidth + gap;
      const newPosition = lastPosition - totalWidth;
      await updateCarouselPosition(newPosition);
      lastPosition = newPosition;
    }
    index = newIndex;

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
    isMouseLocked = false;

    if (isItemWidthAnArray) {
      lastPosition = 0;
      let currentPosition = Math.abs(position);
      itemWidth.every(item => {
        index++;
        lastPosition = -Math.abs(item + gap + Math.abs(lastPosition));
        currentPosition -= item;
        if (currentPosition > 0) {
          return true;
        }
        return false;
      });
    } else {
      index = Math.abs(Math.round(position / itemWidth));
    }

    updateCarouselIndex(index);
  }

  function handleMouseLeave(): void {
    isMouseLocked = false;
  }

  function goToPreviousIndex(): void {
    if (index >= minIndex) {
      updateCarouselIndex(index - 1);
    }
  }

  function goToNextIndex(): void {
    if (index < maxIndex) {
      updateCarouselIndex(index + 1);
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

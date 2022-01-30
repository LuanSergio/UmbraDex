import { RefObject, useEffect, useRef } from 'react';

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

function getCarouselPositionByIndex(
  itemList: Array<number>,
  currentCarouselIndex: number,
  gap: number,
) {
  let value = 0;
  for (let loopIndex = 0; loopIndex <= currentCarouselIndex; loopIndex++) {
    if (loopIndex < currentCarouselIndex) {
      value = value + gap + itemList[loopIndex];
    }

    if (loopIndex === currentCarouselIndex) {
      value += itemList[loopIndex] + gap;
    }
  }

  return -Math.abs(value);
}

const useCarousel = ({
  carouselRef,
  carouselWrapperRef,
  itemWidth,
  itemsQuantity,
  gap,
  maxItems,
  animationDuration = 300,
}: IUseCarouselParams): IUseCarouselResponse => {
  const itemList: Array<number> = Array.isArray(itemWidth)
    ? itemWidth
    : Array(itemsQuantity).fill(itemWidth);

  const minIndex = 1;
  const maxIndex = itemsQuantity - 1;
  const minPosition = 0;
  const maxPosition = useRef(0);

  // set carousel container size
  useEffect(() => {
    if (itemList.length) {
      const width = itemList
        .slice(0, maxItems)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue + gap,
        );

      carouselRef.current?.style.setProperty(
        '--carousel-container-size',
        `${width}px`,
      );
    }
  }, [carouselRef, gap, itemList, maxItems]);

  // set carousel max position
  useEffect(() => {
    if (itemList.length) {
      maxPosition.current =
        itemList.reduce(
          (previousValue, currentValue) => previousValue + currentValue + gap,
        ) -
        gap -
        itemList[itemList.length - 1];
    }
  }, [gap, itemList]);

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
    const newPosition = getCarouselPositionByIndex(itemList, newIndex - 1, gap);
    await updateCarouselPosition(newPosition);
    lastPosition = newPosition;

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
        newPosition >= -Math.abs(maxPosition.current) &&
        newPosition <= -Math.abs(minPosition)
      ) {
        position = newPosition;
        updateCarouselPosition(position);
      }
    }
  }

  function handleMouseUp(event: React.MouseEvent): void {
    event.preventDefault();
    let newIndex = 1;
    let currentPosition = Math.abs(position);
    isMouseLocked = false;

    itemList.every(item => {
      currentPosition -= item + gap;
      console.log('~currentPosition', currentPosition);
      if (currentPosition > item / 2) {
        newIndex++;
      }

      if (currentPosition > item) {
        console.log('~ newIndex', newIndex);
        return true;
      }
      return false;
    });

    updateCarouselIndex(newIndex);
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

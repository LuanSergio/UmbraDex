import { RefObject, useCallback, useEffect, useRef, MouseEvent } from 'react';

interface IUseCarouselParams {
  carouselRef: RefObject<HTMLDivElement>;
  carouselWrapperRef: RefObject<HTMLDivElement>;
  itemWidth: number | number[];
  itemsQuantity: number;
  gap: number;
  maxItems: number;
  animationDuration?: number;
  myIndex: number;
  updateMyIndex: (myIndex: number) => void;
}

interface IUseCarouselResponse {
  handleMouseDown: (event: MouseEvent | TouchEvent) => void;
  handleMouseMove: (event: MouseEvent | TouchEvent) => void;
  handleMouseUp: (event: MouseEvent | TouchEvent) => void;
  handleMouseLeave: (event: MouseEvent | TouchEvent) => void;
  goToPreviousIndex: () => void;
  goToNextIndex: () => void;
}

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

function getTouchOrClickClientX(event: MouseEvent | TouchEvent) {
  event.preventDefault();
  if ('touches' in event) {
    return event.touches[0].clientX;
  }
  return event.clientX;

  return 0;
}

const useCarousel = ({
  carouselRef,
  carouselWrapperRef,
  itemWidth,
  itemsQuantity,
  gap,
  maxItems,
  animationDuration = 300,
  myIndex,
  updateMyIndex,
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

  const updateCarouselPosition = useCallback(
    async (newPosition: number) => {
      await carouselWrapperRef.current?.style.setProperty(
        '--carousel-position',
        `${newPosition}px`,
      );
    },
    [carouselWrapperRef],
  );

  const setCarouselAnimationDuration = useCallback(() => {
    carouselWrapperRef.current?.style.setProperty(
      'transition-duration',
      `${animationDuration}ms`,
    );
  }, [animationDuration, carouselWrapperRef]);

  const removeCarouselAnimationDuration = useCallback(() => {
    setTimeout(() => {
      carouselWrapperRef.current?.style.setProperty(
        'transition-duration',
        `0ms`,
      );
    }, animationDuration);
  }, [animationDuration, carouselWrapperRef]);

  const updateCarouselPositionUsingIndex = useCallback(
    async newIndex => {
      setCarouselAnimationDuration();
      const newPosition = getCarouselPositionByIndex(
        itemList,
        newIndex - 1,
        gap,
      );
      await updateCarouselPosition(newPosition);
      lastPosition = newPosition;

      removeCarouselAnimationDuration();
    },
    [
      gap,
      itemList,
      removeCarouselAnimationDuration,
      setCarouselAnimationDuration,
      updateCarouselPosition,
    ],
  );

  function handleMouseDown(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    isMouseLocked = true;
    initialPosition = getTouchOrClickClientX(event);
  }

  function handleMouseMove(event: MouseEvent | TouchEvent): void {
    if (isMouseLocked) {
      const travelDistance = getTouchOrClickClientX(event) - initialPosition;

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

  function handleMouseUp(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    let newIndex = 0;
    let currentPosition = Math.abs(position);
    isMouseLocked = false;
    itemList.every(item => {
      if (currentPosition > item / 2) {
        newIndex++;
      }
      currentPosition -= item + gap;

      if (currentPosition > item) {
        return true;
      }
      return false;
    });

    updateMyIndex(newIndex);
  }

  function handleMouseLeave(event: MouseEvent | TouchEvent): void {
    if (isMouseLocked) {
      handleMouseUp(event);
    }
    isMouseLocked = false;
  }

  function goToPreviousIndex(): void {
    if (myIndex >= minIndex) {
      updateMyIndex(myIndex - 1);
    }
  }

  function goToNextIndex(): void {
    if (myIndex < maxIndex) {
      updateMyIndex(myIndex + 1);
    }
  }

  useEffect(() => {
    updateCarouselPositionUsingIndex(myIndex);
  }, [updateCarouselPositionUsingIndex, myIndex]);

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

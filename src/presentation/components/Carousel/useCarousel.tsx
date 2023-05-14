import {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  MouseEvent,
  useState,
} from 'react';

interface UseCarouselParams {
  carouselRef: RefObject<HTMLDivElement>;
  carouselWrapperRef: RefObject<HTMLDivElement>;
  itemWidth: number | number[];
  itemsQuantity: number;
  gap: number;
  maxItems: number;
  animationDuration?: number;
  currentIndex: number;
  maxPositionIndex?: number;
  updateCurrentIndex: (CurrentIndex: number) => void;
}

interface UseCarouselResponse {
  handleMouseDown: (event: MouseEvent | TouchEvent) => void;
  handleMouseMove: (event: MouseEvent | TouchEvent) => void;
  handleMouseUp: (event: MouseEvent | TouchEvent) => void;
  handleMouseLeave: (event: MouseEvent | TouchEvent) => void;
  goToPreviousIndex: () => void;
  goToNextIndex: () => void;
}

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
}

const useCarousel = ({
  carouselRef,
  carouselWrapperRef,
  itemWidth,
  itemsQuantity,
  gap,
  maxItems,
  animationDuration = 300,
  currentIndex: CurrentIndex,
  updateCurrentIndex,
  maxPositionIndex,
}: UseCarouselParams): UseCarouselResponse => {
  const itemList: Array<number> = Array.isArray(itemWidth)
    ? itemWidth
    : Array(itemsQuantity).fill(itemWidth);
  const initialPosition = useRef(0);
  const lastPosition = useRef(0);
  const position = useRef(0);
  const isMouseLocked = useRef(false);

  const [containerWidth, setContainerWidth] = useState(0);
  const minIndex = 1;
  const maxIndex = itemsQuantity - 1;
  const minPosition = 0;
  const maxPosition = useRef(0);

  // set carousel container size
  useEffect(() => {
    if (itemList.length) {
      setContainerWidth(
        itemList
          .slice(0, maxItems)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue + gap,
          ),
      );
    }
  }, [itemList, maxItems, gap]);

  useEffect(() => {
    carouselRef.current?.style.setProperty('max-width', `${containerWidth}px`);
  });

  // set carousel max position
  useEffect(() => {
    if (itemList.length) {
      maxPosition.current =
        itemList.reduce((previousValue, currentValue, index) => {
          if (index <= maxPositionIndex) {
            return previousValue + currentValue + gap;
          }
          return previousValue;
        }) -
        gap -
        itemList[itemList.length - 1] +
        20;
    }
  }, [gap, itemList, maxPositionIndex]);

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

  // reset carousel position when items quantity change
  useEffect(() => {
    carouselWrapperRef.current?.style.setProperty('transition-duration', `0ms`);
    updateCarouselPosition(0);
  }, [carouselWrapperRef, itemsQuantity, updateCarouselPosition]);

  const updateCarouselPositionUsingIndex = useCallback(
    async newIndex => {
      if (newIndex <= maxIndex) {
        setCarouselAnimationDuration();
        const newPosition = getCarouselPositionByIndex(
          itemList,
          newIndex <= maxPositionIndex && typeof maxPositionIndex === 'number'
            ? newIndex - 1
            : (maxPositionIndex as number) - 1,
          gap,
        );
        await updateCarouselPosition(newPosition);
        lastPosition.current = newPosition;
        initialPosition.current = newPosition;
        position.current = newPosition;
        removeCarouselAnimationDuration();
      }
    },
    [
      gap,
      itemList,
      maxIndex,
      maxPositionIndex,
      removeCarouselAnimationDuration,
      setCarouselAnimationDuration,
      updateCarouselPosition,
    ],
  );

  function handleMouseDown(event: MouseEvent | TouchEvent): void {
    isMouseLocked.current = true;
    initialPosition.current = getTouchOrClickClientX(event);
  }

  function handleMouseMove(event: MouseEvent | TouchEvent): void {
    if (isMouseLocked.current) {
      const travelDistance =
        getTouchOrClickClientX(event) - initialPosition.current;

      const newPosition = travelDistance + lastPosition.current;

      if (
        newPosition >= -Math.abs(maxPosition.current) &&
        newPosition <= -Math.abs(minPosition)
      ) {
        position.current = newPosition;

        updateCarouselPosition(position.current);
      }
    }
  }

  function handleMouseUp(): void {
    let newIndex = 0;
    let currentPosition = Math.abs(position.current);
    isMouseLocked.current = false;
    itemList.every(item => {
      if (currentPosition > item / 2) {
        if (newIndex < maxIndex) {
          newIndex++;
        }
      }
      currentPosition -= item + gap;

      if (currentPosition > item) {
        return true;
      }
      return false;
    });

    updateCurrentIndex(newIndex);
  }

  function handleMouseLeave(): void {
    if (isMouseLocked.current) {
      handleMouseUp();
    }
    isMouseLocked.current = false;
  }

  function goToPreviousIndex(): void {
    if (CurrentIndex >= minIndex) {
      updateCurrentIndex(CurrentIndex - 1);
      const newPosition = getCarouselPositionByIndex(
        itemList,
        CurrentIndex - 1,
        gap,
      );
      position.current = newPosition;
      lastPosition.current = newPosition;
    }
  }

  function goToNextIndex(): void {
    if (CurrentIndex < maxIndex) {
      updateCurrentIndex(CurrentIndex + 1);
      const newPosition = getCarouselPositionByIndex(
        itemList,
        CurrentIndex + 1,
        gap,
      );
      position.current = newPosition;
      lastPosition.current = newPosition;
    }
  }

  useEffect(() => {
    if (itemsQuantity > maxItems) {
      updateCarouselPositionUsingIndex(CurrentIndex);
    }
  }, [updateCarouselPositionUsingIndex, CurrentIndex, itemsQuantity, maxItems]);

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

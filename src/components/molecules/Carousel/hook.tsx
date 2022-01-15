import { RefObject } from 'react';

interface IUseCarouselParams {
  carouselWrapperRef: RefObject<HTMLDivElement>;
  totalItemWidth: number;
  itemsQuantity: number;
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
  carouselWrapperRef,
  totalItemWidth,
  itemsQuantity,
  animationDuration = 300,
}: IUseCarouselParams): IUseCarouselResponse => {
  const minIndex = 0;
  const maxIndex = itemsQuantity - 1;
  const minPosition = 0;
  const maxPosition = (itemsQuantity - 1) * totalItemWidth;

  async function updateCarouselPosition(newPosition: number): Promise<void> {
    await carouselWrapperRef.current?.style.setProperty(
      '--carousel-position',
      `${newPosition}px`,
    );
    index = Math.abs(Math.round(newPosition / totalItemWidth));
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
    updateCarouselIndex(-(index * totalItemWidth));
    lastPosition = -(index * totalItemWidth);
  }

  function handleMouseLeave(): void {
    isMouseLocked = false;
  }

  function goToPreviousIndex(): void {
    if (index > minIndex) {
      index -= 1;
      updateCarouselIndex(-(index * totalItemWidth));
      lastPosition = -(index * totalItemWidth);
    }
  }

  function goToNextIndex(): void {
    if (index < maxIndex) {
      index += 1;
      updateCarouselIndex(-(index * totalItemWidth));
      lastPosition = -(index * totalItemWidth);
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

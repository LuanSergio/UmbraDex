import { useEffect, useRef, useState } from 'react';

import Important from '@public/icons/important.svg';

import transformNumberToRomanNumeral from '@utils/transformNumberToRomanNumeral';

import Carousel from '@components/Carousel';
import CarouselItem from '@components/CarouselItem';
import ScrollableText from '@components/ScrollableText';

import PokemonDescription from '@domain/entities/PokemonDescription';

import styles from './styles.module.scss';

interface PokemonBasicInformationProps {
  pokedexIndex: number;
  descriptions: PokemonDescription[];
}

const PokemonBasicInformation = ({
  pokedexIndex,
  descriptions,
}: PokemonBasicInformationProps): JSX.Element => {
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const [widthList, setWidthList] = useState([]);

  const descriptionIndexRef = useRef([]);

  function handleDescriptionChange(index: number): void {
    setDescriptionIndex(index);
  }

  useEffect(() => {
    descriptionIndexRef.current.forEach(element => {
      setWidthList(previousState => [
        ...previousState,
        element.getBoundingClientRect().width,
      ]);
    });
  }, []);

  useEffect(() => {
    setDescriptionIndex(0);
  }, [pokedexIndex]);

  return (
    <div
      className={`${styles.generationDescriptionContainer} ${
        descriptions[descriptionIndex]
          ? ''
          : styles.carouselContainerNoDescription
      }`}
    >
      <div className={styles.generationDescriptionContent}>
        {descriptions.length > 1 && (
          <div className={styles.carouselContainer}>
            <Carousel
              currentIndex={descriptionIndex}
              updateCurrentIndex={handleDescriptionChange}
              tagName="ol"
              itemWidth={widthList}
              gap={12}
              maxItems={7}
              maxPositionIndex={descriptions.length - 5}
            >
              {descriptions.map((item, index) => {
                return (
                  <CarouselItem
                    key={`${item.id}`}
                    tagName="li"
                    onClick={() => handleDescriptionChange(index)}
                  >
                    <span
                      ref={element => {
                        descriptionIndexRef.current[index] = element;
                      }}
                      className={`${styles.generationDescriptionOption} ${
                        descriptionIndex === index && styles.active
                      }`}
                    >
                      {transformNumberToRomanNumeral(index + 1)}
                    </span>
                  </CarouselItem>
                );
              })}
            </Carousel>
          </div>
        )}
        {descriptions[descriptionIndex] ? (
          <ScrollableText maxHeight={128} shouldChange={descriptionIndex}>
            <p className={styles.description}>
              {descriptions[descriptionIndex] &&
                descriptions[descriptionIndex].description}

              {(descriptionIndex === 3 || descriptionIndex === 4) && (
                <small className={styles.sideNote}>
                  <Important className={styles.descriptionImportant} /> The
                  fourth and fifth generation share some descriptions
                </small>
              )}
            </p>
          </ScrollableText>
        ) : (
          <p className={styles.noDescription}> No description available yet.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonBasicInformation;

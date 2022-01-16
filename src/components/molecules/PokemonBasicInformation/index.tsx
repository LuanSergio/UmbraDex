import { useEffect, useRef, useState } from 'react';
import transformNumberToRomanNumeral from '@utils/transformNumberToRomanNumeral';
import replaceDashWithSpace from '@utils/replaceDashWithSpace';
import Carousel from '@components/molecules/Carousel';
import styles from './styles.module.scss';

interface PokemonBasicInformationProps {
  name: string;
  pokedexIndex: number;
  types: string[];
  descriptions: PokemonDescription[];
}

const PokemonBasicInformation = ({
  name,
  pokedexIndex,
  types,
  descriptions,
}: PokemonBasicInformationProps): JSX.Element => {
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const [widthList, setWidthList] = useState([]);

  const ref = useRef([]);

  function handleDescriptionChange(index: number): void {
    setDescriptionIndex(index);
  }

  useEffect(() => {
    ref.current.forEach(element => {
      setWidthList(previousState => [...previousState, element.scrollWidth]);
    });
  }, []);

  useEffect(() => {
    setDescriptionIndex(0);
  }, [pokedexIndex]);

  return (
    <div>
      <h1 className={styles.name}>{replaceDashWithSpace(name)}</h1>
      <div className={styles.basicInfo}>
        {pokedexIndex <= 10 ? (
          <span className={styles.number}># 0{pokedexIndex}</span>
        ) : (
          <span className={styles.number}># {pokedexIndex}</span>
        )}
        <div className={styles.typeContainer}>
          {types.map((type, index) => (
            <span
              key={type}
              title={type}
              className={`${styles.type} ${styles[types[index]]} ${
                types.length > 1 ? styles.dualType : styles.singleType
              }`}
              aria-label={type}
            />
          ))}
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <Carousel tagName="ol" itemWidth={widthList} gap={12} maxItems={6}>
          {descriptions.map((item, index) => {
            return (
              <li key={`${item.id}`}>
                <button
                  type="button"
                  className={`${styles.generationDescriptionOption} ${
                    descriptionIndex === index && styles.active
                  }`}
                  ref={element => {
                    ref.current[index] = element;
                  }}
                  onClick={() => handleDescriptionChange(index)}
                >
                  {transformNumberToRomanNumeral(index + 1)}
                </button>
              </li>
            );
          })}
        </Carousel>
        <p className={styles.description}>
          {descriptions[descriptionIndex].description}
          {(descriptionIndex === 3 || descriptionIndex === 4) && (
            <small className={styles.sideNote}>
              Sidenote: The fourth and fifth generation share some descriptions
            </small>
          )}
        </p>
      </div>
    </div>
  );
};

export default PokemonBasicInformation;

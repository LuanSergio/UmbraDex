import { useEffect, useState } from 'react';
import transformNumberToRomanNumeral from '@utils/transformNumberToRomanNumeral';
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
  function handleDescriptionChange(index: number): void {
    setDescriptionIndex(index);
  }

  useEffect(() => {
    setDescriptionIndex(0);
  }, [pokedexIndex]);

  return (
    <div className={styles.informationContainer}>
      <h1 className={styles.name}>{name}</h1>
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
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <ul className={styles.generationDescriptionContainer}>
          {descriptions.map((item, index) => {
            return (
              <li key={`${item.id}`}>
                <button
                  type="button"
                  className={`${styles.generationDescriptionOption} ${
                    descriptionIndex === index && styles.active
                  }`}
                  onClick={() => handleDescriptionChange(index)}
                >
                  {transformNumberToRomanNumeral(index + 1)}
                </button>
              </li>
            );
          })}
        </ul>
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
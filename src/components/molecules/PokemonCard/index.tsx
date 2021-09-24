import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

const PokemonCard = ({
  id,
  name,
  types,
  image,
}: IBasicPokemonInfo): JSX.Element => {
  return (
    <Link href={`/pokemon/${id}`}>
      <div className={styles.card}>
        {id <= 10 ? (
          <span className={styles.number}># 0{id}</span>
        ) : (
          <span className={styles.number}># {id}</span>
        )}

        <div className={styles.pokemonContainer}>
          <span className={styles.pokeball}>{/* <PokeballIcon /> */}</span>
          <Image
            width={216}
            height={216}
            className={styles.pokemon}
            src={image}
            alt={name}
            title={name}
          />
          <span className={`${styles.name} ${styles[types[0]]}`}>{name}</span>
        </div>

        <div className={styles.typeContainer}>
          {types.map((type, index) => (
            <span
              key={type}
              className={`${styles.type} ${styles[types[index]]}`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className={`${styles.background} ${styles[types[0]]}`} />
      </div>
    </Link>
  );
};

export default PokemonCard;

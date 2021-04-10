import styles from './styles.module.scss'
import PokeballIcon from '../../../assets/images/icons/pokeball.svg'

interface Props {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
}

const PokemonCard = ({ id, name, type, imageUrl }: Props): JSX.Element => {
  return (
    <div className={styles.card}>
      <span className={styles.number}># 0{id}</span>
      <div className={styles.pokemonContainer}>
        <span className={styles.pokeball}>
          <PokeballIcon />
        </span>
        <img className={styles.pokemon} src={imageUrl} alt={name} title={name} />
        <span className={styles.name}>{name}</span>
      </div>
      <span className={`${styles.type}`}>{type}</span>
      <div className={`${styles.background} ${styles.background}--${type}`}></div>
    </div>
  );
}

export default PokemonCard;

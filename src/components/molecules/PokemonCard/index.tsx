import styles from './styles.module.scss'

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
        <span className={styles.pokeball}><svg width="152" height="155" viewBox="0 0 152 155" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M75.996 154.893C37.5651 154.867 5.72246 126.673 0 89.8401L39.0877 89.768C44.0812 105.389 58.7158 116.697 75.996 116.706C93.2485 116.686 107.863 105.396 112.875 89.8031L151.949 89.768C146.268 126.623 114.432 154.844 75.996 154.893ZM75.996 103.089C62.0997 103.089 50.8342 91.8235 50.8342 77.9271C50.8342 64.0308 62.0997 52.7653 75.996 52.7653C89.8923 52.7653 101.158 64.0308 101.158 77.9271C101.158 91.8235 89.8923 103.089 75.996 103.089ZM0.0425536 66.0863C5.72431 29.2317 37.5595 1.00977 75.996 0.961666C114.427 0.987568 146.27 29.1817 151.992 66.0141L112.904 66.0863C107.911 50.4656 93.2762 39.1576 75.996 39.1484C58.7435 39.1687 44.1293 50.4582 39.1173 66.0511L0.0425536 66.0863Z" fill="white"/>
</svg>
</span>
        <img className={styles.pokemon} src={imageUrl} alt="{name}" />
        <span className={styles.name}>{name}</span>
      </div>
      <span className={styles.type}>{type}</span>
    </div>
  );
}

export default PokemonCard;

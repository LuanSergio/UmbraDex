import Link from 'next/link';
import getPokemonImageUrl from '@utils/getPokemonImageUrl';
import transformFirstLetterToUppercase from '@utils/transformFirstLetterToUppercase';
import styles from './styles.module.scss';

interface IEvolutionChainProps {
  currentId: number;
  evolutionChain: IPokemonEvolution[];
}

const EvolutionChain = ({
  evolutionChain,
  currentId,
}: IEvolutionChainProps): JSX.Element => {
  return (
    <div className={styles.evolutionChain}>
      {evolutionChain.map(evolution => {
        return (
          <Link href={`/pokemon/${evolution.id}`} key={evolution.id} passHref>
            <a
              className={` ${styles.evolutionContainer} ${
                currentId === evolution.id
                  ? styles.evolutionContainerActive
                  : ''
              }`}
            >
              <div
                title={transformFirstLetterToUppercase(evolution.name)}
                role="img"
                id={evolution.name}
                aria-labelledby={evolution.name}
                className={styles.evolution}
                style={{
                  WebkitMaskImage: `url(${getPokemonImageUrl(evolution.id)})`,
                  maskImage: `url(${getPokemonImageUrl(evolution.id)})`,
                }}
              />
              <span id={evolution.name} className={styles.evolutionName}>
                {evolution.name}
              </span>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default EvolutionChain;

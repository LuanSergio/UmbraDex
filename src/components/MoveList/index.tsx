import LoadingDots from '@public/icons/loading-dots.svg';
import PokeBallIcon from '@public/icons/pokeball.svg';
import useMovesList from 'src/hooks/useMovesList';
import formatPokemonMoveProperty from '@utils/formatPokemoMoveProperty';

import styles from './styles.module.scss';

const MoveList = (): JSX.Element => {
  const { moveList, isLoading } = useMovesList({
    pokemonId: 94,
    groupVersionId: 4,
  });

  return (
    <div className={styles.moveList}>
      {isLoading || moveList === undefined ? (
        <div className={styles.loading}>
          <div className={styles.loadingPokeball}>
            <PokeBallIcon />
          </div>
          <span className={styles.loadingText}>
            Loading
            <span className={styles.loadingDots}>
              <LoadingDots />
            </span>
          </span>
        </div>
      ) : (
        <table className={styles.moveListTable} cellPadding={0} cellSpacing={0}>
          <thead>
            <tr className={styles.moveListTableHeaderRow}>
              <th className={`${styles.moveListHead} ${styles.nameHead}`}>
                Name
              </th>
              <th className={`${styles.moveListHead} ${styles.typeHead}`}>
                Type
              </th>
              <th className={`${styles.moveListHead} ${styles.categoryHead}`}>
                Category
              </th>
              <th className={`${styles.moveListHead} ${styles.accuracyHead}`}>
                Accuracy
              </th>
              <th className={`${styles.moveListHead} ${styles.powerHead}`}>
                Power
              </th>
              <th className={`${styles.moveListHead} ${styles.ppHead}`}>PP</th>
            </tr>
          </thead>
          <tbody
            className={`${styles.moveListMovesContainer} h-neutral-scroll`}
          >
            {moveList?.map(move => (
              <tr className={styles.moveListMovesRow}>
                <td className={`${styles.moveListCell} ${styles.nameCell}`}>
                  {formatPokemonMoveProperty(move.name)}
                </td>
                <td className={`${styles.moveListCell} ${styles.typeCell}`}>
                  {formatPokemonMoveProperty(move.type)}
                </td>
                <td className={`${styles.moveListCell} ${styles.categoryCell}`}>
                  {formatPokemonMoveProperty(move.category)}
                </td>
                <td className={`${styles.moveListCell} ${styles.accuracyCell}`}>
                  {formatPokemonMoveProperty(move.accuracy)}
                </td>
                <td className={`${styles.moveListCell} ${styles.powerCell}`}>
                  {formatPokemonMoveProperty(move.power)}
                </td>
                <td className={`${styles.moveListCell} ${styles.ppCell}`}>
                  {formatPokemonMoveProperty(move.pp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MoveList;

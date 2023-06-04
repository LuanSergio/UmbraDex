import LoadingDots from '@public/icons/loading-dots.svg';
import PokeBallIcon from '@public/icons/pokeball.svg';
import PhysicalIcon from '@public/icons/special.svg';
import SpecialIcon from '@public/icons/physical.svg';
import StatusIcon from '@public/icons/status.svg';

import useMovesList from 'src/hooks/useMovesList';
import formatPokemonMoveProperty from '@utils/formatPokemoMoveProperty';

import TypeBadge from '@components/TypeBadge';
import styles from './styles.module.scss';

const moveCategoryIcon = {
  physical: <SpecialIcon />,
  special: <PhysicalIcon />,
  status: <StatusIcon />,
};

const MoveList = (): JSX.Element => {
  const { moveList, isLoading } = useMovesList({
    pokemonId: 94,
    groupVersionId: 10,
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
              <tr className={styles.moveListMovesRow} key={move.name}>
                <td className={`${styles.moveListCell} ${styles.nameCell}`}>
                  {formatPokemonMoveProperty(move.name)}
                </td>
                <td className={`${styles.moveListCell} ${styles.typeCell}`}>
                  <div className={styles.typeContainer}>
                    <TypeBadge size="small">{move.type}</TypeBadge>
                  </div>
                </td>
                <td className={`${styles.moveListCell} ${styles.categoryCell}`}>
                  <div className={styles.iconContainer}>
                    {moveCategoryIcon[move.category]}
                  </div>
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

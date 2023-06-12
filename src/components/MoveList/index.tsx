/* eslint-disable react/no-array-index-key */
import { Fragment, useEffect, useRef, useState } from 'react';

import Move from '@domain/entities/Move';

import LoadingDots from '@public/icons/loading-dots.svg';
import PokeBallIcon from '@public/icons/pokeball.svg';
import PhysicalIcon from '@public/icons/special.svg';
import SpecialIcon from '@public/icons/physical.svg';
import StatusIcon from '@public/icons/status.svg';

import formatPokemonMoveProperty from '@utils/formatPokemonMoveProperty';
import useMovesList from '@hooks/useMovesList';
import useLoader from '@hooks/useLoader';
import TypeBadge from '@components/TypeBadge';

import MOVE_PER_REQUEST from '@constants/movePerRequest';
import styles from './styles.module.scss';

const moveCategoryIcon = {
  physical: <SpecialIcon />,
  special: <PhysicalIcon />,
  status: <StatusIcon />,
};

interface MoveListProps {
  pokemonId: number;
}

const MoveList = ({ pokemonId }: MoveListProps): JSX.Element => {
  const [loader, setLoader] = useState(null);

  const { moveList, isLoading, setSize } = useMovesList({
    pokemonId,
  });

  useEffect(() => {
    const node = document.querySelector('#loader');

    setLoader(node);
  }, [isLoading, pokemonId]);

  useLoader<Move>({
    loader,
    setSize,
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
            {moveList?.map((list, index) => (
              <Fragment key={index}>
                {list.map(move => (
                  <tr className={styles.moveListMovesRow} key={move.name}>
                    <td className={`${styles.moveListCell} ${styles.nameCell}`}>
                      {formatPokemonMoveProperty(move.name)}
                    </td>
                    <td className={`${styles.moveListCell} ${styles.typeCell}`}>
                      <div className={styles.typeContainer}>
                        <TypeBadge size="small">{move.type}</TypeBadge>
                      </div>
                    </td>
                    <td
                      className={`${styles.moveListCell} ${styles.categoryCell}`}
                    >
                      <div className={styles.iconContainer}>
                        {moveCategoryIcon[move.category]}
                      </div>
                    </td>
                    <td
                      className={`${styles.moveListCell} ${styles.accuracyCell}`}
                    >
                      {formatPokemonMoveProperty(move.accuracy)}
                    </td>
                    <td
                      className={`${styles.moveListCell} ${styles.powerCell}`}
                    >
                      {formatPokemonMoveProperty(move.power)}
                    </td>
                    <td className={`${styles.moveListCell} ${styles.ppCell}`}>
                      {formatPokemonMoveProperty(move.pp)}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}

            {moveList?.[moveList?.length - 1].length >= MOVE_PER_REQUEST && (
              <tr
                id="loader"
                className={styles.moveListMovesRow}
                style={{ height: 124 }}
              >
                <td className={styles.loader}>
                  <PokeBallIcon />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MoveList;
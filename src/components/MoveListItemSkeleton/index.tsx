import styles from './styles.module.scss';

const MoveListItemSkeleton = (): JSX.Element => {
  return (
    <div className={`${styles.row}`}>
      <div
        className={`skeleton-loading-pokemon-type ${styles.cell} ${styles.nameCell}`}
      />
      <div
        className={`skeleton-loading-pokemon-type ${styles.cell} ${styles.typeCell}`}
      />
      <div
        className={`skeleton-loading-pokemon-type ${styles.cell} ${styles.categoryCell}`}
      />
      <div
        className={`skeleton-loading-pokemon-type ${styles.cell} ${styles.accuracyCell}`}
      />
      <div
        className={`skeleton-loading-pokemon-type ${styles.cell} ${styles.powerCell}`}
      />
      <div
        className={`skeleton-loading-pokemon-type ${styles.cell} ${styles.ppCell}`}
      />
    </div>
  );
};

export default MoveListItemSkeleton;

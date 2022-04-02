import BaseRadarChart from '@components/atoms/BaseRadarChart';
import formatStats from '@utils/formatStats';

import styles from './styles.module.scss';

interface IPokemonStatsProps {
  stats: PokemonStats[];
}

const PokemonStats = ({ stats }: IPokemonStatsProps): JSX.Element => {
  return (
    <div className={styles.stats}>
      <div>
        {stats.map(stat => {
          const percentBar = Math.round(stat.value * 100) / 255;

          return (
            <div key={stat.name} className={styles.statsHolder}>
              <label htmlFor={stat.name} className={styles.statsLabel}>
                {formatStats(stat.name)}: {stat.value}
              </label>
              <div
                id={stat.name}
                role="meter"
                aria-valuemax={255}
                aria-valuemin={0}
                aria-valuenow={stat.value}
                className={styles.statsMeter}
              >
                <div
                  style={{ width: `${percentBar}%` }}
                  className={styles.statsMeterValue}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.statsGraph}>
        <BaseRadarChart
          label="label"
          radars={[
            {
              name: 'stats',
              dataKey: 'stat',
            },
          ]}
          data={stats.map(stat => ({
            stat: stat.value,
            label: formatStats(stat.name),
          }))}
        />
      </div>
    </div>
  );
};

export default PokemonStats;

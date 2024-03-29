import PokemonStats from '@domain/entities/PokemonStats';
import formatStats from '@utils/formatStats';
import BaseRadarChart from '@components/BaseRadarChart';

import styles from './styles.module.scss';

interface PokemonStatsProps {
  stats: PokemonStats[];
}

const PokemonStatsChart = ({ stats }: PokemonStatsProps): JSX.Element => {
  return (
    <>
      <h2 className="h-title-level-2">Stats:</h2>
      <div className={styles.stats}>
        <div className={styles.statsList}>
          {stats.map(stat => {
            const percentBar = Math.round(stat.value * 100) / 255;

            return (
              <div key={stat.name} className={styles.statsHolder}>
                <label
                  htmlFor={stat.name}
                  id={stat.name}
                  className={styles.statsLabel}
                >
                  {formatStats(stat.name)}: {stat.value}
                </label>
                <div
                  role="meter"
                  aria-valuemax={255}
                  aria-valuemin={0}
                  aria-valuenow={stat.value}
                  className={styles.statsMeter}
                  aria-labelledby={stat.name}
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

        <div className={styles.statsChart}>
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
              label: formatStats(stat.name, true),
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default PokemonStatsChart;

import PokeBallIcon from '@public/icons/pokeball.svg';
import LoadingDots from '@public/icons/loading-dots.svg';

import TypeBadge from '@components/TypeBadge';

import PokemonTypeEfficiency from '@domain/entities/PokemonTypeEfficiency';
import styles from './styles.module.scss';

interface PokemonTypeEfficiencyProps {
  isLoading: boolean;
  typeEfficiency: PokemonTypeEfficiency;
}

const modifierIcons = {
  '-200': (
    <>
      ½<span style={{ fontSize: 12 }}>x</span>
    </>
  ),
  '-100': (
    <>
      ¼<span style={{ fontSize: 12 }}>x</span>
    </>
  ),
  '0': (
    <>
      0<span style={{ fontSize: 16 }}>x</span>
    </>
  ),
  '200': (
    <>
      2<span style={{ fontSize: 16 }}>x</span>
    </>
  ),
  '400': (
    <>
      4<span style={{ fontSize: 16 }}>x</span>
    </>
  ),
};

const PokemonTypeEfficiencyTable = ({
  isLoading,
  typeEfficiency,
}: PokemonTypeEfficiencyProps) => {
  return (
    <>
      <h2 className="h-title-level-2">Type Efficacies:</h2>
      <div className={styles.pokemonTypeEfficiencyTable}>
        {isLoading || typeEfficiency === undefined ? (
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
          <table className={styles.pokemonTypeEfficiencyContent}>
            <tbody
              className={`${styles.pokemonTypeEfficiencyContainer} h-neutral-scroll`}
            >
              <tr className={styles.pokemonTypeEfficiencyCategory}>
                <th className={styles.pokemonTypeEfficiencyTitle}>Weak to:</th>
              </tr>
              <tr className={styles.pokemonTypeEfficiencyValuesContainer}>
                {typeEfficiency?.weakness?.length > 0 ? (
                  <>
                    {typeEfficiency?.weakness.map(type => (
                      <td key={type.name}>
                        <TypeBadge
                          modifier={
                            <span
                              className={styles.pokemonTypeEfficiencyModifier}
                            >
                              {modifierIcons[type.damageFactor]}
                            </span>
                          }
                          size="small"
                        >
                          {type.name}
                        </TypeBadge>
                      </td>
                    ))}
                  </>
                ) : (
                  <td className={styles.pokemonTypeEfficiencyNone}>None</td>
                )}
              </tr>

              <tr className={styles.pokemonTypeEfficiencyCategory}>
                <th className={styles.pokemonTypeEfficiencyTitle}>
                  Immune to:
                </th>
              </tr>

              <tr className={styles.pokemonTypeEfficiencyValuesContainer}>
                {typeEfficiency?.immunities?.length > 0 ? (
                  <>
                    {typeEfficiency?.immunities.map(type => (
                      <td key={type.name}>
                        <TypeBadge
                          modifier={
                            <span
                              className={styles.pokemonTypeEfficiencyModifier}
                            >
                              {modifierIcons[type.damageFactor]}
                            </span>
                          }
                          size="small"
                        >
                          {type.name}
                        </TypeBadge>
                      </td>
                    ))}
                  </>
                ) : (
                  <td className={styles.pokemonTypeEfficiencyNone}>None</td>
                )}
              </tr>

              <tr className={styles.pokemonTypeEfficiencyCategory}>
                <th className={styles.pokemonTypeEfficiencyTitle}>
                  Resistant to:
                </th>
              </tr>
              <tr className={styles.pokemonTypeEfficiencyValuesContainer}>
                <>
                  {typeEfficiency?.resistances?.length > 0 ? (
                    <>
                      {typeEfficiency?.resistances.map(type => (
                        <td key={type.name}>
                          <TypeBadge
                            modifier={
                              <span
                                className={styles.pokemonTypeEfficiencyModifier}
                              >
                                {modifierIcons[type.damageFactor]}
                              </span>
                            }
                            size="small"
                          >
                            {type.name}
                          </TypeBadge>
                        </td>
                      ))}
                    </>
                  ) : (
                    <td className={styles.pokemonTypeEfficiencyNone}>None</td>
                  )}
                </>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default PokemonTypeEfficiencyTable;

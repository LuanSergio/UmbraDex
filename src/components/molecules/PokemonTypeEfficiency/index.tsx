import PokeBallIcon from '@public/icons/pokeball.svg';
import LoadingDots from '@public/icons/loading-dots.svg';

import TypeBadge from '@components/atoms/TypeBadge';

import styles from './styles.module.scss';

interface IPokemonTypeEfficiency {
  isLoading: boolean;
  typeEfficiency: ITypesEfficiency;
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

const PokemonTypeEfficiency = ({
  isLoading,
  typeEfficiency,
}: IPokemonTypeEfficiency) => {
  return (
    <div className={styles.pokemonTypeEfficiency}>
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
              <td className={styles.pokemonTypeEfficiencyValuesContainer}>
                <ul className={styles.pokemonTypeEfficiencyValues}>
                  {typeEfficiency?.weakness?.length > 0 ? (
                    <>
                      {typeEfficiency?.weakness.map(type => (
                        <li key={type.name}>
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
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className={styles.pokemonTypeEfficiencyNone}>None</li>
                  )}
                </ul>
              </td>
            </tr>

            <tr className={styles.pokemonTypeEfficiencyCategory}>
              <th className={styles.pokemonTypeEfficiencyTitle}>Immune to:</th>
              <td className={styles.pokemonTypeEfficiencyValuesContainer}>
                <ul className={styles.pokemonTypeEfficiencyValues}>
                  {typeEfficiency?.immunities?.length > 0 ? (
                    <>
                      {typeEfficiency?.immunities.map(type => (
                        <li key={type.name}>
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
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className={styles.pokemonTypeEfficiencyNone}>None</li>
                  )}
                </ul>
              </td>
            </tr>

            <tr className={styles.pokemonTypeEfficiencyCategory}>
              <th className={styles.pokemonTypeEfficiencyTitle}>
                Resistant to:
              </th>
              <td className={styles.pokemonTypeEfficiencyValuesContainer}>
                <ul className={styles.pokemonTypeEfficiencyValues}>
                  {typeEfficiency?.resistances?.length > 0 ? (
                    <>
                      {typeEfficiency?.resistances.map(type => (
                        <li key={type.name}>
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
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className={styles.pokemonTypeEfficiencyNone}>None</li>
                  )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PokemonTypeEfficiency;

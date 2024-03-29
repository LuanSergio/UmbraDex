import PokemonTypeEfficiency from '@domain/entities/PokemonTypeEfficiency';

interface TypeEfficacy {
  damageFactor: number;
}

interface TypeEfficaciesResponse {
  name: string;
  efficacies: TypeEfficacy[];
}

function sumEfficacies(efficacies: TypeEfficacy[]) {
  return efficacies.reduce(
    (accumulator, current) => {
      const currentValue =
        current.damageFactor < 100
          ? -Math.abs(current.damageFactor * 2)
          : current.damageFactor;

      return {
        damageFactor: accumulator.damageFactor + currentValue,
      };
    },
    { damageFactor: 0 },
  );
}

export default function formatTypeEfficiency(
  typesEfficiency: TypeEfficaciesResponse[],
): PokemonTypeEfficiency {
  const efficacies = typesEfficiency
    .filter(typeEfficiency => typeEfficiency.efficacies.length)
    .map(type => {
      return {
        name: type.name,
        damageFactor: sumEfficacies(type.efficacies).damageFactor,
      };
    });

  const typeEfficiencies = {
    weakness: efficacies.filter(
      typeEfficiency => typeEfficiency.damageFactor > 100,
    ),
    immunities: efficacies.filter(
      typeEfficiency => typeEfficiency.damageFactor === 0,
    ),
    resistances: efficacies.filter(
      typeEfficiency =>
        typeEfficiency.damageFactor !== 0 && typeEfficiency.damageFactor < 100,
    ),
  };

  return typeEfficiencies;
}

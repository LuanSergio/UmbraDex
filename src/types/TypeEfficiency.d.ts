interface TypeEfficiency {
  name: string;
  damageFactor: number;
}

declare interface PokemonTypeEfficiency {
  weakness: TypeEfficiency[];
  immunities: TypeEfficiency[];
  resistances: TypeEfficiency[];
}

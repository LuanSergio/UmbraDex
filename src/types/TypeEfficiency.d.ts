interface ITypeEfficiency {
  name: string;
  damageFactor: number;
}

declare interface ITypesEfficiency {
  weakness: ITypeEfficiency[];
  immunities: ITypeEfficiency[];
  resistances: ITypeEfficiency[];
}

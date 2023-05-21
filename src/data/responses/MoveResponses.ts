export interface GetByPokemonIdResponse {
  moves: [
    {
      move: {
        name: string;
        power: number;
        pp: number;
        accuracy: number;
        damageClass: {
          name: string;
        };
        type: {
          name: string;
        };
      };
    },
  ];
}

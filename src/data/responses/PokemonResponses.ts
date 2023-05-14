export interface GetAllPokemonResponse {
  pokemonSpecieList: [
    {
      id: 1;
      pokemon: [
        {
          forms: [
            {
              name: string;
              formId: number;
            },
          ];
          types: [
            {
              type: {
                name: string;
              };
            },
          ];
          isDefault: boolean;
        },
      ];
    },
  ];
}

export interface GetPokemonByIdResponse {
  pokedex: [
    {
      pokedexNumbers: [
        {
          number: 1008;
        },
      ];
    },
  ];
  species: [
    {
      pokemon: [
        {
          isDefault: boolean;
          name: string;
          types: [
            {
              type: {
                name: string;
              };
            },
          ];

          pokemonForms: {
            forms: [
              {
                formName: string;
                formOrder: number;
                id: number;
                pokemonDetails: {
                  stats: [
                    {
                      statValue: number;
                      stat: {
                        name: string;
                      };
                    },
                  ];
                  weight: number;
                  height: number;
                };
              },
            ];
            abilities: [
              {
                ability: {
                  name: string;
                };
              },
            ];
          };
        },
      ];
      specieName: [
        {
          name: string;
        },
      ];
      flavorTexts: [
        {
          id: number;
          flavorText: string;
          versionId: number;
        },
      ];
      evolutionChain: {
        specie: [
          {
            id: number;
            name: string;
            order: number;
          },
        ];
      };
      generationId: number;
    },
  ];
}

export type DogeO = {
  version: '0.1.0';
  name: 'doge_o';
  instructions: [
    {
      name: 'initStats';
      accounts: [
        {
          name: 'initAuthority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'dogeStats';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeMetadata';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'stats';
          type: {
            defined: 'Stats';
          };
        }
      ];
    },
    {
      name: 'upgradeDoge';
      accounts: [
        {
          name: 'dogeStats';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dtrkToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dtrkMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeToken';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeMetadata';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'initAuthority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'dogeHolder';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'newStats';
          type: {
            defined: 'Stats';
          };
        }
      ];
    },
    {
      name: 'setWinPercentage';
      accounts: [
        {
          name: 'initAuthority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'dogeStats';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeMint';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'winPct';
          type: 'u8';
        }
      ];
    },
    {
      name: 'closeOldAccounts';
      accounts: [
        {
          name: 'initAuthority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'newAuthority';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeStats';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeMint';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'setAddresses';
      accounts: [
        {
          name: 'initAuthority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'dogeStats';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeMetadata';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'dogeStats';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'agility';
            type: 'u8';
          },
          {
            name: 'speed';
            type: 'u8';
          },
          {
            name: 'endurance';
            type: 'u8';
          },
          {
            name: 'dogeBump';
            type: 'u8';
          },
          {
            name: 'winPercentage';
            type: 'u8';
          },
          {
            name: 'dogeMint';
            type: 'publicKey';
          },
          {
            name: 'initAuthority';
            type: 'publicKey';
          },
          {
            name: 'dogeMetadata';
            type: 'publicKey';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'Stats';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'endurance';
            type: 'u8';
          },
          {
            name: 'speed';
            type: 'u8';
          },
          {
            name: 'agility';
            type: 'u8';
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'InvalidStats';
      msg: 'Doge stats should be between 1 to 100';
    },
    {
      code: 6001;
      name: 'InvalidWinPercentage';
      msg: 'Doge Win percentage should be between 1 to 100';
    },
    {
      code: 6002;
      name: 'InvalidUpdateStats';
      msg: 'Invalid Doge stats for upgrade';
    },
    {
      code: 6003;
      name: 'InsufficientTokens';
      msg: 'Insufficient DTRK for upgrade';
    },
    {
      code: 6004;
      name: 'EmptyDogeToken';
      msg: 'Empty doge token account';
    },
    {
      code: 6005;
      name: 'InvalidDogeMetadata';
      msg: 'Invalid doge metadata supplied';
    },
    {
      code: 6006;
      name: 'MaintenanceMode';
      msg: 'DogeO in maintenance';
    }
  ];
};

export const IDL: DogeO = {
  version: '0.1.0',
  name: 'doge_o',
  instructions: [
    {
      name: 'initStats',
      accounts: [
        {
          name: 'initAuthority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'dogeStats',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeMetadata',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stats',
          type: {
            defined: 'Stats',
          },
        },
      ],
    },
    {
      name: 'upgradeDoge',
      accounts: [
        {
          name: 'dogeStats',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dtrkToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dtrkMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeToken',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeMetadata',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'initAuthority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'dogeHolder',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'newStats',
          type: {
            defined: 'Stats',
          },
        },
      ],
    },
    {
      name: 'setWinPercentage',
      accounts: [
        {
          name: 'initAuthority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'dogeStats',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeMint',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'winPct',
          type: 'u8',
        },
      ],
    },
    {
      name: 'closeOldAccounts',
      accounts: [
        {
          name: 'initAuthority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'newAuthority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeStats',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeMint',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'setAddresses',
      accounts: [
        {
          name: 'initAuthority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'dogeStats',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeMetadata',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'dogeStats',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'agility',
            type: 'u8',
          },
          {
            name: 'speed',
            type: 'u8',
          },
          {
            name: 'endurance',
            type: 'u8',
          },
          {
            name: 'dogeBump',
            type: 'u8',
          },
          {
            name: 'winPercentage',
            type: 'u8',
          },
          {
            name: 'dogeMint',
            type: 'publicKey',
          },
          {
            name: 'initAuthority',
            type: 'publicKey',
          },
          {
            name: 'dogeMetadata',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'Stats',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'endurance',
            type: 'u8',
          },
          {
            name: 'speed',
            type: 'u8',
          },
          {
            name: 'agility',
            type: 'u8',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidStats',
      msg: 'Doge stats should be between 1 to 100',
    },
    {
      code: 6001,
      name: 'InvalidWinPercentage',
      msg: 'Doge Win percentage should be between 1 to 100',
    },
    {
      code: 6002,
      name: 'InvalidUpdateStats',
      msg: 'Invalid Doge stats for upgrade',
    },
    {
      code: 6003,
      name: 'InsufficientTokens',
      msg: 'Insufficient DTRK for upgrade',
    },
    {
      code: 6004,
      name: 'EmptyDogeToken',
      msg: 'Empty doge token account',
    },
    {
      code: 6005,
      name: 'InvalidDogeMetadata',
      msg: 'Invalid doge metadata supplied',
    },
    {
      code: 6006,
      name: 'MaintenanceMode',
      msg: 'DogeO in maintenance',
    },
  ],
};

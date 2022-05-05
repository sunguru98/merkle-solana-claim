export type MerkleDistributor = {
  version: '0.0.0';
  name: 'merkle_distributor';
  instructions: [
    {
      name: 'newDistributor';
      accounts: [
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'base';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'distributor';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'mint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'bump';
          type: 'u8';
        },
        {
          name: 'root';
          type: {
            array: ['u8', 32];
          };
        },
        {
          name: 'maxTotalClaim';
          type: 'u64';
        },
        {
          name: 'maxNumNodes';
          type: 'u64';
        }
      ];
    },
    {
      name: 'claim';
      accounts: [
        {
          name: 'distributor';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'claimStatus';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'from';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'to';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'claimant';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'bump';
          type: 'u8';
        },
        {
          name: 'index';
          type: 'u64';
        },
        {
          name: 'amount';
          type: 'u64';
        },
        {
          name: 'proof';
          type: {
            vec: {
              array: ['u8', 32];
            };
          };
        }
      ];
    },
    {
      name: 'surrenderTokens';
      accounts: [
        {
          name: 'authority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'distributor';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'from';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'to';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: 'merkleDistributor';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'authority';
            type: 'publicKey';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'root';
            type: {
              array: ['u8', 32];
            };
          },
          {
            name: 'mint';
            type: 'publicKey';
          },
          {
            name: 'maxTotalClaim';
            type: 'u64';
          },
          {
            name: 'maxNumNodes';
            type: 'u64';
          },
          {
            name: 'totalAmountClaimed';
            type: 'u64';
          },
          {
            name: 'numNodesClaimed';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'claimStatus';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'isClaimed';
            type: 'bool';
          },
          {
            name: 'claimant';
            type: 'publicKey';
          },
          {
            name: 'claimedAt';
            type: 'i64';
          },
          {
            name: 'amount';
            type: 'u64';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'ErrorCode';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'InvalidProof';
          },
          {
            name: 'DropAlreadyClaimed';
          },
          {
            name: 'ExceededMaxClaim';
          },
          {
            name: 'ExceededMaxNumNodes';
          },
          {
            name: 'Unauthorized';
          },
          {
            name: 'OwnerMismatch';
          }
        ];
      };
    }
  ];
  events: [
    {
      name: 'ClaimedEvent';
      fields: [
        {
          name: 'index';
          type: 'u64';
          index: false;
        },
        {
          name: 'claimant';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        }
      ];
    }
  ];
};

export const IDL: MerkleDistributor = {
  version: '0.0.0',
  name: 'merkle_distributor',
  instructions: [
    {
      name: 'newDistributor',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'base',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'distributor',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
        {
          name: 'root',
          type: {
            array: ['u8', 32],
          },
        },
        {
          name: 'maxTotalClaim',
          type: 'u64',
        },
        {
          name: 'maxNumNodes',
          type: 'u64',
        },
      ],
    },
    {
      name: 'claim',
      accounts: [
        {
          name: 'distributor',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'claimStatus',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'from',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'to',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'claimant',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
        {
          name: 'index',
          type: 'u64',
        },
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'proof',
          type: {
            vec: {
              array: ['u8', 32],
            },
          },
        },
      ],
    },
    {
      name: 'surrenderTokens',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'distributor',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'from',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'to',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'merkleDistributor',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'maxTotalClaim',
            type: 'u64',
          },
          {
            name: 'maxNumNodes',
            type: 'u64',
          },
          {
            name: 'totalAmountClaimed',
            type: 'u64',
          },
          {
            name: 'numNodesClaimed',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'claimStatus',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'isClaimed',
            type: 'bool',
          },
          {
            name: 'claimant',
            type: 'publicKey',
          },
          {
            name: 'claimedAt',
            type: 'i64',
          },
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'ErrorCode',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'InvalidProof',
          },
          {
            name: 'DropAlreadyClaimed',
          },
          {
            name: 'ExceededMaxClaim',
          },
          {
            name: 'ExceededMaxNumNodes',
          },
          {
            name: 'Unauthorized',
          },
          {
            name: 'OwnerMismatch',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'ClaimedEvent',
      fields: [
        {
          name: 'index',
          type: 'u64',
          index: false,
        },
        {
          name: 'claimant',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
      ],
    },
  ],
};

export type Dogegamecontract = {
  version: '0.1.0';
  name: 'dogegamecontract';
  instructions: [
    {
      name: 'createLobby';
      accounts: [
        {
          name: 'trackHolder';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'lobbyAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'trackMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackMetadata';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackHolderToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dtrkMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'wsolMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackHolderDtrk';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lobbyDtrkToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyTrackToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyWsolToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
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
          name: 'lobbyMetadata';
          type: {
            defined: 'LobbyData';
          };
        }
      ];
    },
    {
      name: 'updateLobbyMetadata';
      accounts: [
        {
          name: 'lobbyAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'trackHolder';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'trackMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyDtrkToken';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lobbyTrackToken';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'newLobbyMetadata';
          type: {
            defined: 'LobbyData';
          };
        }
      ];
    },
    {
      name: 'closeLobby';
      accounts: [
        {
          name: 'trackHolder';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'lobbyAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'trackMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dtrkMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'wsolMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lobbyDtrkToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyWsolToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'trackHolderToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyTrackToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'registerDogeRacer';
      accounts: [
        {
          name: 'dogeHolder';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'dogeRacerAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'initAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeOPda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeTokenAccount';
          isMut: false;
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
      args: [];
    },
    {
      name: 'joinRace';
      accounts: [
        {
          name: 'dogeHolder';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'initAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeRacerAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeOPda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackMint';
          isMut: false;
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
          name: 'wsolMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeHolderWsol';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyWsolToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dtrkMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeHolderDtrk';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyDtrkToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'leaveRace';
      accounts: [
        {
          name: 'dogeHolder';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'initAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeRacerAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeOPda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeTokenAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackMint';
          isMut: false;
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
          name: 'wsolMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeHolderWsol';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyWsolToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dtrkMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeHolderDtrk';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyDtrkToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'flushStaleRacer';
      accounts: [
        {
          name: 'dogeHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'initAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeRacerAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeOPda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackMint';
          isMut: false;
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
          name: 'wsolMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeHolderWsol';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyWsolToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dtrkMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeHolderDtrk';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyDtrkToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'concludeRace';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'initAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeRacerAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'dogeOPda';
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
          name: 'dtrkMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'wsolMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeHolderDtrk';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyDtrkToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyWsolToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'trackHolderDtrk';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeOProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'treasuryWsolToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasuryAddress';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeHolder';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'isWinner';
          type: 'bool';
        },
        {
          name: 'newWinPct';
          type: 'u8';
        }
      ];
    },
    {
      name: 'cacheRace';
      accounts: [
        {
          name: 'authority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'raceDataState';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lobbyAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'winnerDogeRacerAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeOPda';
          isMut: false;
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
          name: 'trackMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'trackHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dogeHolder';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'initAuthority';
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
          name: 'raceStarted';
          type: 'u64';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'lobbyState';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'raceStarted';
            type: 'bool';
          },
          {
            name: 'unlockTime';
            type: 'u64';
          },
          {
            name: 'lobbyData';
            type: {
              defined: 'LobbyData';
            };
          },
          {
            name: 'trackKeys';
            type: {
              defined: 'TrackKeys';
            };
          },
          {
            name: 'stateAuthority';
            type: 'publicKey';
          },
          {
            name: 'racers';
            type: {
              vec: 'publicKey';
            };
          }
        ];
      };
    },
    {
      name: 'raceState';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'lobbyAccount';
            type: 'publicKey';
          },
          {
            name: 'trackMint';
            type: 'publicKey';
          },
          {
            name: 'trackHolder';
            type: 'publicKey';
          },
          {
            name: 'winnerDogeRacerAccount';
            type: 'publicKey';
          },
          {
            name: 'dogeRacers';
            type: {
              vec: 'publicKey';
            };
          },
          {
            name: 'raceStartedAt';
            type: 'u64';
          },
          {
            name: 'dtrkFee';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'dogeRacerState';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'dogeOPda';
            type: 'publicKey';
          },
          {
            name: 'currentLobbyRace';
            type: 'publicKey';
          },
          {
            name: 'lastJoinedTimestamp';
            type: 'u64';
          },
          {
            name: 'dogeHolderDtrk';
            type: 'publicKey';
          },
          {
            name: 'totalWins';
            type: 'u64';
          },
          {
            name: 'totalLosses';
            type: 'u64';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'LobbyData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'totalLaps';
            type: 'u8';
          },
          {
            name: 'minClass';
            type: 'u8';
          },
          {
            name: 'entryFee';
            type: 'u64';
          },
          {
            name: 'name';
            type: 'string';
          },
          {
            name: 'location';
            type: 'string';
          },
          {
            name: 'trackType';
            type: {
              defined: 'TrackType';
            };
          }
        ];
      };
    },
    {
      name: 'TrackKeys';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'trackMint';
            type: 'publicKey';
          },
          {
            name: 'trackMetadata';
            type: 'publicKey';
          },
          {
            name: 'lobbyDtrkToken';
            type: 'publicKey';
          },
          {
            name: 'lobbyTrackToken';
            type: 'publicKey';
          },
          {
            name: 'lobbyWsolToken';
            type: 'publicKey';
          },
          {
            name: 'trackHolder';
            type: 'publicKey';
          },
          {
            name: 'trackHolderToken';
            type: 'publicKey';
          },
          {
            name: 'trackHolderDtrk';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'TrackType';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'Dirt';
          },
          {
            name: 'Space';
          },
          {
            name: 'Pavement';
          },
          {
            name: 'Sand';
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'MathOverflow';
      msg: 'Math Overflow';
    },
    {
      code: 6001;
      name: 'InvalidTrack';
      msg: 'Invalid Track';
    },
    {
      code: 6002;
      name: 'UnauthorizedTrackHolder';
      msg: 'Unauthorized Track Holder';
    },
    {
      code: 6003;
      name: 'UnauthorizedTrackMint';
      msg: 'Unauthorized Track Mint';
    },
    {
      code: 6004;
      name: 'InvalidLobbyMetadata';
      msg: 'Invalid Lobby Metadata';
    },
    {
      code: 6005;
      name: 'InvalidRacerName';
      msg: 'Invalid Racer Name';
    },
    {
      code: 6006;
      name: 'InvalidDogeStats';
      msg: 'Invalid Doge Stats';
    },
    {
      code: 6007;
      name: 'UnauthorizedRacer';
      msg: 'Unauthorized Doge Racer';
    },
    {
      code: 6008;
      name: 'LobbyLocked';
      msg: 'Lobby account locked';
    },
    {
      code: 6009;
      name: 'LobbyOccupied';
      msg: 'Lobby contains doges';
    },
    {
      code: 6010;
      name: 'LobbyNotFull';
      msg: 'Lobby is not full';
    },
    {
      code: 6011;
      name: 'LobbyFull';
      msg: 'Lobby is full';
    },
    {
      code: 6012;
      name: 'LobbyVaultNotEmpty';
      msg: 'Lobby DTRK vault not empty';
    },
    {
      code: 6013;
      name: 'InvalidLobbyTokenAccount';
      msg: 'Invalid Lobby Token account';
    },
    {
      code: 6014;
      name: 'InsufficientDTRK';
      msg: 'Insufficient DTRK';
    },
    {
      code: 6015;
      name: 'InsufficientSOL';
      msg: 'Insufficient SOL';
    },
    {
      code: 6016;
      name: 'InvalidDogePosition';
      msg: 'Invalid Doge Position';
    },
    {
      code: 6017;
      name: 'RaceAlreadyStarted';
      msg: 'Cannot leave a race which has started already';
    },
    {
      code: 6018;
      name: 'RaceNotStarted';
      msg: 'Cannot conclude winner before race started';
    },
    {
      code: 6019;
      name: 'DogeInRace';
      msg: 'Doge Already in Race. Cannot join twice';
    },
    {
      code: 6020;
      name: 'RacerNotStale';
      msg: 'Racer is not stale to be flushed';
    }
  ];
};

export const IDL: Dogegamecontract = {
  version: '0.1.0',
  name: 'dogegamecontract',
  instructions: [
    {
      name: 'createLobby',
      accounts: [
        {
          name: 'trackHolder',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'lobbyAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'trackMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackMetadata',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackHolderToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dtrkMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'wsolMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackHolderDtrk',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lobbyDtrkToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyTrackToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyWsolToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
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
          name: 'lobbyMetadata',
          type: {
            defined: 'LobbyData',
          },
        },
      ],
    },
    {
      name: 'updateLobbyMetadata',
      accounts: [
        {
          name: 'lobbyAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'trackHolder',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'trackMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyDtrkToken',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lobbyTrackToken',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'newLobbyMetadata',
          type: {
            defined: 'LobbyData',
          },
        },
      ],
    },
    {
      name: 'closeLobby',
      accounts: [
        {
          name: 'trackHolder',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'lobbyAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'trackMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dtrkMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'wsolMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lobbyDtrkToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyWsolToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'trackHolderToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyTrackToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'registerDogeRacer',
      accounts: [
        {
          name: 'dogeHolder',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'dogeRacerAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'initAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeOPda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeTokenAccount',
          isMut: false,
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
      args: [],
    },
    {
      name: 'joinRace',
      accounts: [
        {
          name: 'dogeHolder',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'initAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeRacerAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeOPda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackMint',
          isMut: false,
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
          name: 'wsolMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeHolderWsol',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyWsolToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dtrkMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeHolderDtrk',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyDtrkToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'leaveRace',
      accounts: [
        {
          name: 'dogeHolder',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'initAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeRacerAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeOPda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeTokenAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackMint',
          isMut: false,
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
          name: 'wsolMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeHolderWsol',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyWsolToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dtrkMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeHolderDtrk',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyDtrkToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'flushStaleRacer',
      accounts: [
        {
          name: 'dogeHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'initAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeRacerAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeOPda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackMint',
          isMut: false,
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
          name: 'wsolMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeHolderWsol',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyWsolToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dtrkMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeHolderDtrk',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyDtrkToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'concludeRace',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'initAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeRacerAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dogeOPda',
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
          name: 'dtrkMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'wsolMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeHolderDtrk',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyDtrkToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyWsolToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'trackHolderDtrk',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeOProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasuryWsolToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasuryAddress',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeHolder',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'isWinner',
          type: 'bool',
        },
        {
          name: 'newWinPct',
          type: 'u8',
        },
      ],
    },
    {
      name: 'cacheRace',
      accounts: [
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'raceDataState',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lobbyAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'winnerDogeRacerAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeOPda',
          isMut: false,
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
          name: 'trackMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'trackHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dogeHolder',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'initAuthority',
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
          name: 'raceStarted',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'lobbyState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'raceStarted',
            type: 'bool',
          },
          {
            name: 'unlockTime',
            type: 'u64',
          },
          {
            name: 'lobbyData',
            type: {
              defined: 'LobbyData',
            },
          },
          {
            name: 'trackKeys',
            type: {
              defined: 'TrackKeys',
            },
          },
          {
            name: 'stateAuthority',
            type: 'publicKey',
          },
          {
            name: 'racers',
            type: {
              vec: 'publicKey',
            },
          },
        ],
      },
    },
    {
      name: 'raceState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'lobbyAccount',
            type: 'publicKey',
          },
          {
            name: 'trackMint',
            type: 'publicKey',
          },
          {
            name: 'trackHolder',
            type: 'publicKey',
          },
          {
            name: 'winnerDogeRacerAccount',
            type: 'publicKey',
          },
          {
            name: 'dogeRacers',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'raceStartedAt',
            type: 'u64',
          },
          {
            name: 'dtrkFee',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'dogeRacerState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'dogeOPda',
            type: 'publicKey',
          },
          {
            name: 'currentLobbyRace',
            type: 'publicKey',
          },
          {
            name: 'lastJoinedTimestamp',
            type: 'u64',
          },
          {
            name: 'dogeHolderDtrk',
            type: 'publicKey',
          },
          {
            name: 'totalWins',
            type: 'u64',
          },
          {
            name: 'totalLosses',
            type: 'u64',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'LobbyData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'totalLaps',
            type: 'u8',
          },
          {
            name: 'minClass',
            type: 'u8',
          },
          {
            name: 'entryFee',
            type: 'u64',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'location',
            type: 'string',
          },
          {
            name: 'trackType',
            type: {
              defined: 'TrackType',
            },
          },
        ],
      },
    },
    {
      name: 'TrackKeys',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'trackMint',
            type: 'publicKey',
          },
          {
            name: 'trackMetadata',
            type: 'publicKey',
          },
          {
            name: 'lobbyDtrkToken',
            type: 'publicKey',
          },
          {
            name: 'lobbyTrackToken',
            type: 'publicKey',
          },
          {
            name: 'lobbyWsolToken',
            type: 'publicKey',
          },
          {
            name: 'trackHolder',
            type: 'publicKey',
          },
          {
            name: 'trackHolderToken',
            type: 'publicKey',
          },
          {
            name: 'trackHolderDtrk',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'TrackType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Dirt',
          },
          {
            name: 'Space',
          },
          {
            name: 'Pavement',
          },
          {
            name: 'Sand',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'MathOverflow',
      msg: 'Math Overflow',
    },
    {
      code: 6001,
      name: 'InvalidTrack',
      msg: 'Invalid Track',
    },
    {
      code: 6002,
      name: 'UnauthorizedTrackHolder',
      msg: 'Unauthorized Track Holder',
    },
    {
      code: 6003,
      name: 'UnauthorizedTrackMint',
      msg: 'Unauthorized Track Mint',
    },
    {
      code: 6004,
      name: 'InvalidLobbyMetadata',
      msg: 'Invalid Lobby Metadata',
    },
    {
      code: 6005,
      name: 'InvalidRacerName',
      msg: 'Invalid Racer Name',
    },
    {
      code: 6006,
      name: 'InvalidDogeStats',
      msg: 'Invalid Doge Stats',
    },
    {
      code: 6007,
      name: 'UnauthorizedRacer',
      msg: 'Unauthorized Doge Racer',
    },
    {
      code: 6008,
      name: 'LobbyLocked',
      msg: 'Lobby account locked',
    },
    {
      code: 6009,
      name: 'LobbyOccupied',
      msg: 'Lobby contains doges',
    },
    {
      code: 6010,
      name: 'LobbyNotFull',
      msg: 'Lobby is not full',
    },
    {
      code: 6011,
      name: 'LobbyFull',
      msg: 'Lobby is full',
    },
    {
      code: 6012,
      name: 'LobbyVaultNotEmpty',
      msg: 'Lobby DTRK vault not empty',
    },
    {
      code: 6013,
      name: 'InvalidLobbyTokenAccount',
      msg: 'Invalid Lobby Token account',
    },
    {
      code: 6014,
      name: 'InsufficientDTRK',
      msg: 'Insufficient DTRK',
    },
    {
      code: 6015,
      name: 'InsufficientSOL',
      msg: 'Insufficient SOL',
    },
    {
      code: 6016,
      name: 'InvalidDogePosition',
      msg: 'Invalid Doge Position',
    },
    {
      code: 6017,
      name: 'RaceAlreadyStarted',
      msg: 'Cannot leave a race which has started already',
    },
    {
      code: 6018,
      name: 'RaceNotStarted',
      msg: 'Cannot conclude winner before race started',
    },
    {
      code: 6019,
      name: 'DogeInRace',
      msg: 'Doge Already in Race. Cannot join twice',
    },
    {
      code: 6020,
      name: 'RacerNotStale',
      msg: 'Racer is not stale to be flushed',
    },
  ],
};

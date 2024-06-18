import { readFileSync } from 'fs';
import { expect } from 'vitest';

import Argon2Type from '../src/enums/Argon2Type';
import Argon2Version from '../src/enums/Argon2Version';
import CompressionAlgorithm from '../src/enums/CompressionAlgorithm';
import DefaultIconNumber from '../src/enums/DefaultIconNumber';
import KdfUuid from '../src/enums/KdfUuid';
import SymmetricCipherUuid from '../src/enums/SymmetricCipherUuid';
import TriState from '../src/enums/TriState';
import type { KdfParameters } from '../src/header/types';
import createChallengeResponseKey from '../src/keys/createChallengeResponseKey';
import createFileKey from '../src/keys/createFileKey';
import createPasswordKey from '../src/keys/createPasswordKey';
import { type KdbxKey } from '../src/keys/types';
import type Database from '../src/structure/Database';
import Uint8ArrayHelper from '../src/utilities/Uint8ArrayHelper';
import jsIcon from './attachments/js-icon';
import nodeCrypto from './crypto/nodeCrypto';

const mockChallengeResponseKey = createChallengeResponseKey(
  (challenge: Uint8Array) => {
    const mockResponses = [
      // YubiKey Challenge-Response with secret key 0de28ecd0d35e91f6bea76d3c09f020ce79af783
      {
        data: Uint8Array.from([
          0x98, 0x48, 0xeb, 0x4c, 0x3c, 0x04, 0x43, 0x61, 0xfa, 0x02, 0x89,
          0x2b, 0x66, 0xbd, 0xf5, 0xfd, 0x72, 0x1e, 0x12, 0xe7, 0x3b, 0x37,
          0xde, 0x8b, 0x53, 0x3a, 0x32, 0x2f, 0x14, 0xab, 0xec, 0x89,
        ]),
        response: Uint8Array.from([
          0x3b, 0x16, 0x7c, 0x56, 0xf9, 0x2a, 0xc5, 0x01, 0xcd, 0xdd, 0xa3,
          0xf1, 0x09, 0x0e, 0xdb, 0x36, 0xe7, 0x1e, 0x7d, 0x42,
        ]),
      },
    ];

    for (const { data, response } of mockResponses) {
      if (Uint8ArrayHelper.areEqual(data, challenge)) {
        return Promise.resolve(response);
      }
    }

    throw new Error('Unknown challenge response');
  },
);

type DatabaseInformation = {
  file: Buffer;
  expectedCipher: SymmetricCipherUuid;
  expectedCompressionAlgorithm: CompressionAlgorithm;
  expectedIvLength: number;
  expectedKdfParameters: KdfParameters;
  keyFactory: () => Promise<KdbxKey[]>;
};

export const sampleDatabasesKeePass2: Record<string, DatabaseInformation> = {
  AesAesCompressed: {
    file: readFileSync('fixtures/databases/keepass2-kdbx4-aes-kdf-aes.kdbx'),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesAesUncompressed: {
    file: readFileSync(
      'fixtures/databases/keepass2-kdbx4-aes-kdf-aes-uncompressed.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.None,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
};

export const sampleDatabasesKeePassXC: Record<string, DatabaseInformation> = {
  AesAesCompressed: {
    file: readFileSync('fixtures/databases/kdbx4-aes-kdf-aes.kdbx'),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesAesUncompressed: {
    file: readFileSync(
      'fixtures/databases/kdbx4-aes-kdf-aes-uncompressed.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.None,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesAesWithKeyFile: {
    file: readFileSync(
      'fixtures/databases/kdbx4-aes-kdf-aes-with-key-file.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [
      await createPasswordKey(nodeCrypto, 'password'),
      await createFileKey(nodeCrypto, readFileSync('fixtures/sample.key')),
    ],
  },
  AesAesWithHardwareKey: {
    file: readFileSync(
      'fixtures/databases/kdbx4-aes-kdf-aes-with-hardware-key.kdbx',
    ),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [
      await createPasswordKey(nodeCrypto, 'password'),
      mockChallengeResponseKey,
    ],
  },
  AesChaCha20: {
    file: readFileSync('fixtures/databases/kdbx4-aes-kdf-chacha20.kdbx'),
    expectedCipher: SymmetricCipherUuid.ChaCha20,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 12,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  AesTwofish: {
    file: readFileSync('fixtures/databases/kdbx4-aes-kdf-twofish.kdbx'),
    expectedCipher: SymmetricCipherUuid.Twofish,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      uuid: KdfUuid.AesKdbx4,
      rounds: BigInt(100),
      seed: expect.any(Uint8Array) as Uint8Array,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
  Argon2dAes: {
    file: readFileSync('fixtures/databases/kdbx4-argon2d-kdf-aes.kdbx'),
    expectedCipher: SymmetricCipherUuid.Aes256,
    expectedCompressionAlgorithm: CompressionAlgorithm.GZip,
    expectedIvLength: 16,
    expectedKdfParameters: {
      iterations: BigInt(2),
      memoryInKibibytes: BigInt(1024),
      parallelism: BigInt(1),
      seed: expect.any(Uint8Array) as Uint8Array,
      type: Argon2Type.Argon2d,
      uuid: KdfUuid.Argon2d,
      version: Argon2Version.V13,
    },
    keyFactory: async () => [await createPasswordKey(nodeCrypto, 'password')],
  },
};

export const sampleDatabaseCases = [
  ...Object.entries(sampleDatabasesKeePassXC).map(
    ([name, information]): [string, DatabaseInformation] => [
      `${name} generated with KeePassXC`,
      information,
    ],
  ),
  ...Object.entries(sampleDatabasesKeePass2).map(
    ([name, information]): [string, DatabaseInformation] => [
      `${name} generated with KeePass2`,
      information,
    ],
  ),
];

export const sampleDatabaseFeatures: Database = {
  metadata: {
    generator: 'KeePassXC',
    name: 'Passwords',
    nameChanged: new Date('2023-06-14T14:41:20.000Z'),
    description: 'Lots of features used',
    descriptionChanged: new Date('2023-06-14T14:40:31.000Z'),
    defaultUserName: 'user@example.com',
    defaultUserNameChanged: new Date('2023-06-14T05:51:55.000Z'),
    maintenanceHistoryDays: 365,
    color: '',
    masterKeyChanged: new Date('2023-06-12T00:41:08.000Z'),
    masterKeyChangeRec: -1,
    masterKeyChangeForce: -1,
    memoryProtection: {
      protectTitle: false,
      protectUserName: false,
      protectPassword: true,
      protectURL: false,
      protectNotes: false,
    },
    customIcons: {
      '7e1dc2ab-f493-44c1-8847-919d4ee18020': {
        uuid: '7e1dc2ab-f493-44c1-8847-919d4ee18020',
        name: 'js',
        lastModificationTime: new Date('2023-06-14T05:44:31.000Z'),
        data: jsIcon,
      },
    },
    recycleBinEnabled: true,
    recycleBinUuid: 'cf4fa281-5c0b-463e-b411-b0221d5bfb22',
    recycleBinChanged: new Date('2023-06-14T05:48:34.000Z'),
    entryTemplatesGroup: '00000000-0000-0000-0000-000000000000',
    entryTemplatesGroupChanged: new Date('2023-06-12T00:40:30.000Z'),
    lastSelectedGroup: '00000000-0000-0000-0000-000000000000',
    lastTopVisibleGroup: '00000000-0000-0000-0000-000000000000',
    historyMaxItems: 100,
    historyMaxSize: 10485760,
    settingsChanged: new Date('2023-06-14T14:41:20.000Z'),
  },
  root: {
    group: {
      uuid: '9ad8b63f-e8b9-4b32-9980-97967a9e00ae',
      name: 'Renamed Root Group',
      notes: '',
      iconNumber: DefaultIconNumber.Folder,
      timeInfo: {
        lastModificationTime: new Date('2023-06-14T06:01:29.000Z'),
        creationTime: new Date('2023-06-12T00:40:30.000Z'),
        lastAccessTime: new Date('2023-06-14T06:01:29.000Z'),
        expiryTime: new Date('2023-06-12T00:40:30.000Z'),
        expires: false,
        usageCount: 0,
        locationChanged: new Date('2023-06-12T00:40:30.000Z'),
      },
      isExpanded: true,
      defaultAutoTypeSequence: '',
      enableAutoType: TriState.Inherit,
      enableSearching: TriState.Inherit,
      lastTopVisibleEntry: '00000000-0000-0000-0000-000000000000',
      entries: [
        {
          uuid: '61bea55f-f844-45b6-b0b7-7fe720227824',
          iconNumber: DefaultIconNumber.Password,
          foregroundColor: '',
          backgroundColor: '',
          overrideURL: '',
          tags: '',
          timeInfo: {
            lastModificationTime: new Date('2023-06-12T00:43:03.000Z'),
            creationTime: new Date('2023-06-12T00:42:14.000Z'),
            lastAccessTime: new Date('2023-06-12T00:43:03.000Z'),
            expiryTime: new Date('2023-06-12T00:42:14.000Z'),
            expires: false,
            usageCount: 0,
            locationChanged: new Date('2023-06-12T00:43:03.000Z'),
          },
          attributes: {
            Notes: '',
            Password: 'winking-unicycle-ecology-decimal',
            Title: 'Sample Entry',
            URL: '',
            UserName: 'user@example.com',
          },
          protectedAttributes: ['Password'],
          autoType: {
            enabled: true,
            dataTransferObfuscation: 0,
            defaultSequence: '',
          },
          history: [],
        },
        {
          uuid: 'a541e4a3-ee00-4c0b-89ca-126acbfe6674',
          iconNumber: DefaultIconNumber.Password,
          foregroundColor: '#00aa00',
          backgroundColor: '#000000',
          overrideURL: '',
          tags: '',
          timeInfo: {
            lastModificationTime: new Date('2023-06-14T06:06:41.000Z'),
            creationTime: new Date('2023-06-14T05:49:07.000Z'),
            lastAccessTime: new Date('2023-06-14T06:06:41.000Z'),
            expiryTime: new Date('2023-06-14T05:49:07.000Z'),
            expires: false,
            usageCount: 0,
            locationChanged: new Date('2023-06-14T05:49:13.000Z'),
          },
          qualityCheck: false,
          attributes: {
            Notes: '',
            Password: '',
            Title: 'TOTP Entry',
            URL: '',
            UserName: '',
            otp: 'otpauth://totp/TOTP%20Entry:none?secret=DEADBEEF&period=30&digits=6&issuer=TOTP%20Entry',
          },
          protectedAttributes: ['Password', 'otp'],
          autoType: {
            enabled: true,
            dataTransferObfuscation: 0,
            defaultSequence: '',
          },
          customData: {
            _LAST_MODIFIED: {
              key: '_LAST_MODIFIED',
              value: 'Sat Jun 15 14:00:17 2024 GMT',
            },
            BrowserHideEntry: {
              key: 'BrowserHideEntry',
              value: 'false',
            },
            BrowserOnlyHttpAuth: {
              key: 'BrowserOnlyHttpAuth',
              value: 'false',
            },
            BrowserSkipAutoSubmit: {
              key: 'BrowserSkipAutoSubmit',
              value: 'false',
            },
            BrowserNotHttpAuth: {
              key: 'BrowserNotHttpAuth',
              value: 'false',
            },
          },
          history: [
            {
              uuid: 'a541e4a3-ee00-4c0b-89ca-126acbfe6674',
              iconNumber: DefaultIconNumber.Password,
              foregroundColor: '',
              backgroundColor: '',
              overrideURL: '',
              tags: '',
              timeInfo: {
                lastModificationTime: new Date('2023-06-14T05:49:13.000Z'),
                creationTime: new Date('2023-06-14T05:49:07.000Z'),
                lastAccessTime: new Date('2023-06-14T05:49:13.000Z'),
                expiryTime: new Date('2023-06-14T05:49:07.000Z'),
                expires: false,
                usageCount: 0,
                locationChanged: new Date('2023-06-14T05:49:13.000Z'),
              },
              attributes: {
                Notes: '',
                Password: '',
                Title: 'TOTP Entry',
                URL: '',
                UserName: '',
              },
              protectedAttributes: ['Password'],
              autoType: {
                enabled: true,
                dataTransferObfuscation: 0,
                defaultSequence: '',
              },
            },
            {
              uuid: 'a541e4a3-ee00-4c0b-89ca-126acbfe6674',
              iconNumber: DefaultIconNumber.Password,
              foregroundColor: '',
              backgroundColor: '',
              overrideURL: '',
              tags: '',
              timeInfo: {
                lastModificationTime: new Date('2023-06-14T05:49:23.000Z'),
                creationTime: new Date('2023-06-14T05:49:07.000Z'),
                lastAccessTime: new Date('2023-06-14T05:49:23.000Z'),
                expiryTime: new Date('2023-06-14T05:49:07.000Z'),
                expires: false,
                usageCount: 0,
                locationChanged: new Date('2023-06-14T05:49:13.000Z'),
              },
              attributes: {
                Notes: '',
                Password: '',
                Title: 'TOTP Entry',
                URL: '',
                UserName: '',
                otp: 'otpauth://totp/TOTP%20Entry:none?secret=SECRET&period=30&digits=6&issuer=TOTP%20Entry',
              },
              protectedAttributes: ['Password', 'otp'],
              autoType: {
                enabled: true,
                dataTransferObfuscation: 0,
                defaultSequence: '',
              },
            },
            {
              uuid: 'a541e4a3-ee00-4c0b-89ca-126acbfe6674',
              iconNumber: DefaultIconNumber.Password,
              foregroundColor: '',
              backgroundColor: '',
              overrideURL: '',
              tags: '',
              timeInfo: {
                lastModificationTime: new Date('2023-06-14T05:50:03.000Z'),
                creationTime: new Date('2023-06-14T05:49:07.000Z'),
                lastAccessTime: new Date('2023-06-14T05:50:03.000Z'),
                expiryTime: new Date('2023-06-14T05:49:07.000Z'),
                expires: false,
                usageCount: 0,
                locationChanged: new Date('2023-06-14T05:49:13.000Z'),
              },
              attributes: {
                Notes: '',
                Password: '',
                Title: 'TOTP Entry',
                URL: '',
                UserName: '',
                otp: 'otpauth://totp/TOTP%20Entry:none?secret=DEADBEEF&period=30&digits=6&issuer=TOTP%20Entry',
              },
              protectedAttributes: ['Password', 'otp'],
              autoType: {
                enabled: true,
                dataTransferObfuscation: 0,
                defaultSequence: '',
              },
            },
          ],
        },
      ],
      children: [
        {
          uuid: 'cf4f46af-280d-4f96-b69d-f5f009847c29',
          name: 'Group A',
          notes: '',
          iconNumber: DefaultIconNumber.Password,
          customIcon: '7e1dc2ab-f493-44c1-8847-919d4ee18020',
          timeInfo: {
            lastModificationTime: new Date('2023-06-14T05:50:38.000Z'),
            creationTime: new Date('2023-06-14T05:43:32.000Z'),
            lastAccessTime: new Date('2023-06-14T05:50:38.000Z'),
            expiryTime: new Date('2999-06-13T05:43:32.000Z'),
            expires: true,
            usageCount: 0,
            locationChanged: new Date('2023-06-14T05:45:04.000Z'),
          },
          isExpanded: true,
          defaultAutoTypeSequence: '{USERNAME}{TAB}{PASSWORD}{ENTER}',
          enableAutoType: TriState.Enable,
          enableSearching: TriState.Disable,
          lastTopVisibleEntry: '00000000-0000-0000-0000-000000000000',
          customData: {
            _LAST_MODIFIED: {
              key: '_LAST_MODIFIED',
              value: 'Sat Jun 15 14:00:17 2024 GMT',
            },
            BrowserHideEntry: {
              key: 'BrowserHideEntry',
              value: 'false',
            },
            BrowserOnlyHttpAuth: {
              key: 'BrowserOnlyHttpAuth',
              value: 'false',
            },
            BrowserSkipAutoSubmit: {
              key: 'BrowserSkipAutoSubmit',
              value: 'true',
            },
            BrowserNotHttpAuth: {
              key: 'BrowserNotHttpAuth',
              value: 'true',
            },
          },
          entries: [
            {
              uuid: '7e5f4ef1-ddf9-48e3-8eea-83f39b938436',
              iconNumber: DefaultIconNumber.PackageNetwork,
              foregroundColor: '',
              backgroundColor: '',
              overrideURL: '',
              tags: 'expires;example;edited',
              timeInfo: {
                lastModificationTime: new Date('2023-06-14T06:02:24.000Z'),
                creationTime: new Date('2023-06-14T05:45:07.000Z'),
                lastAccessTime: new Date('2023-06-14T06:02:24.000Z'),
                expiryTime: new Date('2499-06-13T05:45:47.000Z'),
                expires: true,
                usageCount: 0,
                locationChanged: new Date('2023-06-14T05:47:56.000Z'),
              },
              attributes: {
                'Attribute A': 'Not protected',
                'Attribute B': 'Protected',
                KP2A_URL: 'https://another.example.com',
                Notes: 'Has notes',
                Password: 'password',
                Title: 'Item',
                URL: 'https://www.example.com',
                UserName: 'username',
              },
              protectedAttributes: ['Attribute B', 'Password'],
              attachments: {
                'KeeAgent.settings': Uint8Array.from(
                  readFileSync('fixtures/attachments/KeeAgent.settings.bin'),
                ),
                'attachment.txt': Uint8Array.from([
                  97, 116, 116, 97, 99, 104, 109, 101, 110, 116,
                ]),
              },
              autoType: {
                enabled: true,
                dataTransferObfuscation: 0,
                defaultSequence: 'CUSTOM',
                associations: [
                  {
                    window: 'Passwords',
                    sequence: 'Custom for Passwords',
                  },
                ],
              },
              customData: {
                _LAST_MODIFIED: {
                  key: '_LAST_MODIFIED',
                  value: 'Sat Jun 15 14:00:17 2024 GMT',
                },
                BrowserHideEntry: {
                  key: 'BrowserHideEntry',
                  value: 'true',
                },
                BrowserOnlyHttpAuth: {
                  key: 'BrowserOnlyHttpAuth',
                  value: 'true',
                },
                BrowserSkipAutoSubmit: {
                  key: 'BrowserSkipAutoSubmit',
                  value: 'true',
                },
                BrowserNotHttpAuth: {
                  key: 'BrowserNotHttpAuth',
                  value: 'true',
                },
              },
              history: [
                {
                  uuid: '7e5f4ef1-ddf9-48e3-8eea-83f39b938436',
                  iconNumber: DefaultIconNumber.PackageNetwork,
                  foregroundColor: '',
                  backgroundColor: '',
                  overrideURL: '',
                  tags: 'expires;example',
                  timeInfo: {
                    lastModificationTime: new Date('2023-06-14T05:47:56.000Z'),
                    creationTime: new Date('2023-06-14T05:45:07.000Z'),
                    lastAccessTime: new Date('2023-06-14T05:47:56.000Z'),
                    expiryTime: new Date('2499-06-13T05:45:47.000Z'),
                    expires: true,
                    usageCount: 0,
                    locationChanged: new Date('2023-06-14T05:47:56.000Z'),
                  },
                  attributes: {
                    'Attribute A': 'Not protected',
                    'Attribute B': 'Protected',
                    KP2A_URL: 'https://another.example.com',
                    Notes: 'Has notes',
                    Password: 'password',
                    Title: 'Item',
                    URL: 'https://www.example.com',
                    UserName: 'username',
                  },
                  protectedAttributes: ['Attribute B', 'Password'],
                  attachments: {
                    'KeeAgent.settings': Uint8Array.from(
                      readFileSync(
                        'fixtures/attachments/KeeAgent.settings.bin',
                      ),
                    ),
                    'attachment.txt': Uint8Array.from([
                      97, 116, 116, 97, 99, 104, 109, 101, 110, 116,
                    ]),
                  },
                  autoType: {
                    enabled: true,
                    dataTransferObfuscation: 0,
                    defaultSequence: 'CUSTOM',
                    associations: [
                      {
                        window: 'Passwords',
                        sequence: 'Custom for Passwords',
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          uuid: '41c86d3d-28fe-48b0-b935-44d419a14b66',
          name: 'Collapsed Group',
          notes: '',
          iconNumber: DefaultIconNumber.Folder,
          timeInfo: {
            lastModificationTime: new Date('2023-06-14T14:36:34.000Z'),
            creationTime: new Date('2023-06-14T06:01:40.000Z'),
            lastAccessTime: new Date('2023-06-14T14:36:34.000Z'),
            expiryTime: new Date('2023-06-14T06:01:40.000Z'),
            expires: false,
            usageCount: 0,
            locationChanged: new Date('2023-06-14T06:01:49.000Z'),
          },
          isExpanded: false,
          defaultAutoTypeSequence: '',
          enableAutoType: TriState.Inherit,
          enableSearching: TriState.Inherit,
          lastTopVisibleEntry: '00000000-0000-0000-0000-000000000000',
          previousParentGroup: 'cf4f46af-280d-4f96-b69d-f5f009847c29',
          children: [
            {
              uuid: '34161e5d-58f9-4f5f-a550-cd2325a4d554',
              name: 'Child Group',
              notes: '',
              iconNumber: DefaultIconNumber.Feather,
              timeInfo: {
                lastModificationTime: new Date('2023-06-14T06:02:02.000Z'),
                creationTime: new Date('2023-06-14T06:01:51.000Z'),
                lastAccessTime: new Date('2023-06-14T06:02:02.000Z'),
                expiryTime: new Date('2023-06-14T06:01:51.000Z'),
                expires: false,
                usageCount: 0,
                locationChanged: new Date('2023-06-14T06:02:02.000Z'),
              },
              isExpanded: true,
              defaultAutoTypeSequence: '',
              enableAutoType: TriState.Inherit,
              enableSearching: TriState.Inherit,
              lastTopVisibleEntry: '00000000-0000-0000-0000-000000000000',
            },
          ],
        },
        {
          uuid: 'cf4fa281-5c0b-463e-b411-b0221d5bfb22',
          name: 'Recycle Bin',
          notes: '',
          iconNumber: DefaultIconNumber.EditTrash,
          timeInfo: {
            lastModificationTime: new Date('2023-06-14T06:01:45.000Z'),
            creationTime: new Date('2023-06-14T05:48:34.000Z'),
            lastAccessTime: new Date('2023-06-14T06:01:45.000Z'),
            expiryTime: new Date('2023-06-14T05:48:34.000Z'),
            expires: false,
            usageCount: 0,
            locationChanged: new Date('2023-06-14T05:48:34.000Z'),
          },
          isExpanded: true,
          defaultAutoTypeSequence: '',
          enableAutoType: TriState.Disable,
          enableSearching: TriState.Disable,
          lastTopVisibleEntry: '00000000-0000-0000-0000-000000000000',
          entries: [
            {
              uuid: '273049df-60a9-424f-8f12-adaecbc68e7b',
              iconNumber: DefaultIconNumber.Password,
              foregroundColor: '',
              backgroundColor: '',
              overrideURL: '',
              tags: '',
              timeInfo: {
                lastModificationTime: new Date('2023-06-14T06:01:19.000Z'),
                creationTime: new Date('2023-06-14T06:01:11.000Z'),
                lastAccessTime: new Date('2023-06-14T06:01:19.000Z'),
                expiryTime: new Date('2023-06-14T06:01:11.000Z'),
                expires: false,
                usageCount: 0,
                locationChanged: new Date('2023-06-14T06:01:19.000Z'),
              },
              previousParentGroup: '9ad8b63f-e8b9-4b32-9980-97967a9e00ae',
              attributes: {
                Notes: '',
                Password: '',
                Title: 'Deleted A',
                URL: '',
                UserName: 'user@example.com',
              },
              protectedAttributes: ['Password'],
              autoType: {
                enabled: true,
                dataTransferObfuscation: 0,
                defaultSequence: '',
              },
              customData: {
                _LAST_MODIFIED: {
                  key: '_LAST_MODIFIED',
                  value: 'Sat Jun 15 14:00:17 2024 GMT',
                },
                BrowserHideEntry: {
                  key: 'BrowserHideEntry',
                  value: 'false',
                },
                BrowserOnlyHttpAuth: {
                  key: 'BrowserOnlyHttpAuth',
                  value: 'false',
                },
                BrowserSkipAutoSubmit: {
                  key: 'BrowserSkipAutoSubmit',
                  value: 'false',
                },
                BrowserNotHttpAuth: {
                  key: 'BrowserNotHttpAuth',
                  value: 'false',
                },
              },
              history: [],
            },
          ],
          children: [
            {
              uuid: '0a9b0535-1c40-4d7e-833f-99cfa19391b9',
              name: 'Deleted Group',
              notes: '',
              iconNumber: DefaultIconNumber.Folder,
              timeInfo: {
                lastModificationTime: new Date('2023-06-14T05:50:38.000Z'),
                creationTime: new Date('2023-06-14T05:48:10.000Z'),
                lastAccessTime: new Date('2023-06-14T05:50:38.000Z'),
                expiryTime: new Date('2023-06-14T05:48:10.000Z'),
                expires: false,
                usageCount: 0,
                locationChanged: new Date('2023-06-14T05:48:43.000Z'),
              },
              isExpanded: true,
              defaultAutoTypeSequence: '',
              enableAutoType: TriState.Inherit,
              enableSearching: TriState.Inherit,
              lastTopVisibleEntry: '00000000-0000-0000-0000-000000000000',
              previousParentGroup: '9ad8b63f-e8b9-4b32-9980-97967a9e00ae',
              entries: [
                {
                  uuid: '0b24c00f-eebe-4442-9b1b-8cd397335f9a',
                  iconNumber: DefaultIconNumber.Password,
                  foregroundColor: '',
                  backgroundColor: '',
                  overrideURL: '',
                  tags: '',
                  timeInfo: {
                    lastModificationTime: new Date('2023-06-14T05:48:41.000Z'),
                    creationTime: new Date('2023-06-14T05:48:18.000Z'),
                    lastAccessTime: new Date('2023-06-14T05:48:41.000Z'),
                    expiryTime: new Date('2023-06-14T05:48:18.000Z'),
                    expires: false,
                    usageCount: 0,
                    locationChanged: new Date('2023-06-14T05:48:41.000Z'),
                  },
                  previousParentGroup: 'cf4fa281-5c0b-463e-b411-b0221d5bfb22',
                  attributes: {
                    Notes: '',
                    Password: 'deleted',
                    Title: 'Item in Deleted Group',
                    URL: '',
                    UserName: 'item',
                  },
                  protectedAttributes: ['Password'],
                  autoType: {
                    enabled: true,
                    dataTransferObfuscation: 0,
                    defaultSequence: '',
                  },
                  customData: {
                    _LAST_MODIFIED: {
                      key: '_LAST_MODIFIED',
                      value: 'Sat Jun 15 14:00:17 2024 GMT',
                    },
                    BrowserHideEntry: {
                      key: 'BrowserHideEntry',
                      value: 'false',
                    },
                    BrowserOnlyHttpAuth: {
                      key: 'BrowserOnlyHttpAuth',
                      value: 'false',
                    },
                    BrowserSkipAutoSubmit: {
                      key: 'BrowserSkipAutoSubmit',
                      value: 'false',
                    },
                    BrowserNotHttpAuth: {
                      key: 'BrowserNotHttpAuth',
                      value: 'false',
                    },
                  },
                  history: [],
                },
              ],
            },
          ],
        },
      ],
    },
    deletedObjects: [
      {
        deletionTime: new Date('2023-06-14T06:01:32.000Z'),
        uuid: 'bcc47282-1134-469f-a443-e41dd8fe6498',
      },
    ],
  },
};

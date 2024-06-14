const Argon2Version = Object.freeze({
  V10: 0x10,
  V13: 0x13,
} as const);

type Argon2Version = (typeof Argon2Version)[keyof typeof Argon2Version];

export default Argon2Version;

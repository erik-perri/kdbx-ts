const Argon2Type = Object.freeze({
  Argon2d: 0,
  Argon2id: 1,
} as const);

type Argon2Type = (typeof Argon2Type)[keyof typeof Argon2Type];

export default Argon2Type;

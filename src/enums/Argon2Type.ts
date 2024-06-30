const Argon2Type = Object.freeze({
  Argon2d: 0,
  // Argon2i: 1,
  Argon2id: 2,
} as const);

type Argon2Type = (typeof Argon2Type)[keyof typeof Argon2Type];

export default Argon2Type;

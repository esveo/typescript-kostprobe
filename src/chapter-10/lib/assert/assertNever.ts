export function assertNever(x: never): never {
  throw new Error(`x has unexpected type ${typeof x}`);
}

export function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export function sample<T extends ReadonlyArray<any>>(array: T): T[number] {
  const randomIndex = random(0, array.length);
  return array[randomIndex];
}

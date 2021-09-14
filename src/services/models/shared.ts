export type KeysMatching<T, V> = NonNullable<
  {
    [K in keyof T]: T[K] extends V ? K : never;
  }[keyof T]
>;

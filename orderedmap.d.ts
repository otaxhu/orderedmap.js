export type Element<K, V> = {
  readonly key: K,
  readonly value: V,
  readonly nextElement?: Element<K, V>,
  readonly prevElement?: Element<K, V>,
};

export declare class OrderedMap<K, V> extends Map<K, V> {

  public constructor(iterable?: IterableIterator<readonly [K, V]> |
                                readonly (readonly [K, V])[] |
                                null);

  readonly public size: number;

  public set(key: K, value: V): this;

  public get(key: K): V | undefined;

  public clear(): void;

  public delete(key: K): boolean;

  public entries(): IterableIterator<[K, V]>;

  public values(): IterableIterator<V>;

  public forEach(callbackFunc: (value: V, key: K, map: OrderedMap<K, V>) => void,
                 thisArg?: any): void;

  public has(key: K): boolean;

  public keys(): IterableIterator<K>;

  public [Symbol.iterator](): IterableIterator<[K, V]>;

  public static groupBy<GroupKey, GroupValue>(iterable: IterableIterator<GroupValue> | readonly GroupValue[],
                                              callbackFunc: (item: GroupValue, index: number) => GroupKey
                                              ): OrderedMap<GroupKey, GroupValue[]>;

  /*
   * New methods that extends Map class with more functionality
   */

  public getElement(key: K): Element<K, V> | undefined;

  public back(): Element<K, V> | undefined;

  public front(): Element<K, V> | undefined;
}

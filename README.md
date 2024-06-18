# Ordered Map

You can think of this `OrderedMap` as a regular JavaScript `Map`, but where you can get the previous and next elements of any of the entries in the `OrderedMap` without knowing their keys.

In fact `OrderedMap` extends `Map` standard JavaScript class, so you can use this implementation as a regular JavaScript `Map`.

## Methods and Properties:
  - `OrderedMap` extends `Map`, meaning that all of the methods and properties from `Map` are also available with no behaviour change on them.

    **See [MDN Docs Map website](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) for more information.**

  ### New methods

  - #### `.getElement(key: K): Element<K, V> | undefined`

    Gets an element with key `key` previously setted (either through the constructor or `.set()` method), and returns an object with the following type:
    ```ts
    type Element<K, V> = {
      readonly key: K,
      readonly value: V,
      readonly nextElement?: Element<K, V>,
      readonly prevElement?: Element<K, V>,
    }
    ```
    Or `undefined` if an element with that key was not found in the OrderedMap.

  - #### `.front(): Element<K, V> | undefined`

    Returns the first element in the OrderedMap as an `Element<K, V>` object type, or `undefined` if the OrderedMap is empty.

  - #### `.back(): Element<K, V> | undefined`

    Returns the last element in the OrderedMap as an `Element<K, V>` object type, or `undefined` if the OrderedMap is empty.

## Types
  For more information on the type declarations, see the file [`orderedmap.d.ts`](/orderedmap.d.ts)

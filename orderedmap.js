"use strict";

function __readonlyProp(obj, prop, value) {
  const attributes = __readonlyProp.attributes ||
    (__readonlyProp.attributes = {
      enumerable: true,
      configurable: true,
    });

  attributes.value = value;
  Object.defineProperty(obj, prop, attributes);
}

/**
 * @template K, V
 */
export class OrderedMap extends Map {
  /**
   * @param {IterableIterator<readonly [K, V]> | readonly (readonly [K, V])[] | null=} iterable
   */
  constructor(iterable) {
    if (iterable === undefined || iterable === null) {
      super();
      this.__list = new _LinkedList();
      return;
    }

    if (typeof iterable !== "object" || !iterable[Symbol.iterator]) {
      throw TypeError("'iterable' parameter must implement IterableIterator interface");
    }

    super();

    /**
     * @type {_LinkedList<K, V>}
     * @private
     */
    this.__list = new _LinkedList();

    for (const item of iterable) {
      if (item.length < 2) {
        throw TypeError("each entry in 'iterable' parameter must be an array with at least length 2");
      }
      this.set(item[0], item[1]);
    }
  }

  /**
   * @param {K} key
   * @param {V} value
   * 
   * @returns {this}
   */
  set(key, value) {

    /**
     * @type {import("./orderedmap").Element<K, V>}
     */
    let element = super.get(key);
    if (element) {
      __readonlyProp(element, "value", value);
      return this;
    }

    element = this.__list.pushBack(key, value);
    super.set(key, element);

    return this;
  }

  /**
   * @param {K} key
   *
   * @returns {V=}
   */
  get(key) {
    return super.get(key)?.value;
  }

  /**
   * @param {K} key
   *
   * @returns {import("./orderedmap").Element<K, V>=}
   */
  getElement(key) {
    return super.get(key);
  }

  clear() {
    super.clear();
    this.__list.clear();
  }

  /**
   * @param {K} key
   *
   * @returns {boolean}
   */
  delete(key) {
    const el = this.getElement(key);

    if (!el) {
      return false;
    }

    this.__list.remove(el);
    super.delete(key);

    return true;
  }

  /**
   * @returns {IterableIterator<[K, V]>}
   */
  *entries() {
    for (let el = this.front(); el; el = el.nextElement) {
      yield [el.key, el.value];
    }
  }

  /**
   * @returns {IterableIterator<V>}
   */
  *values() {
    for (let el = this.front(); el; el = el.nextElement) {
      yield el.value;
    }
  }

  /**
   * @param {(value: V, key: K, map: OrderedMap<K, V>) => void} callbackFunc 
   * @param {any} thisArg
   */
  forEach(callbackFunc, thisArg) {
    for (let el = this.front(); el; el = el.nextElement) {
      callbackFunc.call(thisArg, el.value, el.key, this);
    }
  }

  /**
   * @returns {import("./orderedmap").Element<K, V>=}
   */
  back() {
    return this.__list.back();
  }

  /**
   * @returns {import("./orderedmap").Element<K, V>=}
   */
  front() {
    return this.__list.front();
  }

  /**
   * @returns {IterableIterator<[K, V]>}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
}

/**
 * @template K, V
 */
class _LinkedList {
  constructor() {
    /**
     * @type {{prevElement?: import("./orderedmap").Element<K, V>; nextElement?: import("./orderedmap").Element<K, V>}}
     */
    this.__root = {};
  }

  /**
   * @param {K} key
   * @param {V} value
   * @returns {import("./orderedmap").Element<K, V>}
   */
  pushBack(key, value) {
    /**
     * @type {import("./orderedmap").Element<K, V>}
     */
    const element = {
      get key() {
        return key;
      },
      get value() {
        return value;
      },
    };

    // The list is empty
    if (!this.__root.prevElement) {
      this.__root.prevElement = element;
      this.__root.nextElement = element;

      return element;
    }

    __readonlyProp(element, "prevElement", this.back());

    __readonlyProp(this.back(), "nextElement", element);

    this.__root.prevElement = element;

    return element;
  }

  clear() {
    this.__root = {};
  }

  /**
   * @param {import("./orderedmap").Element<K, V>} element
   */
  remove(element) {
    if (!element.prevElement) {

      this.__root.nextElement = element.nextElement;

    } else {

      __readonlyProp(element.prevElement, "nextElement", element.nextElement);

    }

    if (!element.nextElement) {

      this.__root.prevElement = element.prevElement;

    } else {

      __readonlyProp(element.nextElement, "prevElement", element.prevElement);

    }
  }

  /**
   * @returns {import("./orderedmap").Element<K, V>=}
   */
  front() {
    return this.__root.nextElement;
  }

  /**
   * @returns {import("./orderedmap").Element<K, V>=}
   */
  back() {
    return this.__root.prevElement;
  }
}

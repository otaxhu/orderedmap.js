"use strict";

function __readonlyProp(obj, prop, value) {
  // @ts-ignore
  const attributes = __readonlyProp.attributes ||
    // @ts-ignore
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
export default class OrderedMap extends Map {

  /**
   * @type {_LinkedList<K, V>}
   */
  #list;

  /**
   * @param {IterableIterator<readonly [K, V]> | readonly (readonly [K, V])[] | null=} iterable
   */
  constructor(iterable) {

    super();

    if (iterable === undefined || iterable === null) {
      this.#list = new _LinkedList();
      return;
    }

    if (typeof iterable !== "object" || !iterable[Symbol.iterator]) {
      throw TypeError("'iterable' parameter must implement IterableIterator interface");
    }

    this.#list = new _LinkedList();

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

    element = this.#list.pushBack(key, value);
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
    this.#list.clear();
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

    this.#list.remove(el);
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
    if (!callbackFunc || typeof callbackFunc !== "function") {
      throw TypeError("'callbackFunc' parameter must be a function");
    }
    for (let el = this.front(); el; el = el.nextElement) {
      callbackFunc.call(thisArg, el.value, el.key, this);
    }
  }

  /**
   * @returns {import("./orderedmap").Element<K, V>=}
   */
  back() {
    return this.#list.back();
  }

  /**
   * @returns {import("./orderedmap").Element<K, V>=}
   */
  front() {
    return this.#list.front();
  }

  /**
   * @returns {IterableIterator<[K, V]>}
   */
  [Symbol.iterator]() {
    return this.entries();
  }

  /**
   * @template GroupKey, GroupValue
   *
   * @param {IterableIterator<GroupValue>} iterableElements
   * @param {(item: GroupValue, index: number) => GroupKey} callbackFunc
   * @returns {OrderedMap<GroupKey, GroupValue[]>}
   */
  static groupBy(iterableElements, callbackFunc) {
    if (!iterableElements || typeof iterableElements !== "object" || !iterableElements[Symbol.iterator]) {
      throw TypeError("'iterable' parameter must implement IterableIterator interface");
    }
    if (!callbackFunc || typeof callbackFunc !== "function") {
      throw TypeError("'callbackFunc' parameter must be a function");
    }
    const map = new OrderedMap();
    let i = 0;
    for (const item of iterableElements) {
      const group = callbackFunc(item, i++);
      let prevItems = map.get(group);
      if (!prevItems) {
        prevItems = [];
        map.set(group, prevItems);
      }
      prevItems.push(item);
    }
    return map;
  }

  /**
   * @template R
   *
   * @param {(key: K, value: V, index: number) => R} callbackFunc 
   * @param {any} thisArg
   *
   * @returns {R[]}
   */
  mapToArray(callbackFunc, thisArg) {
    if (!callbackFunc || typeof callbackFunc !== "function") {
      throw TypeError("'callbackFunc' parameter must be a function");
    }
    const array = [];
    let i = 0;
    for (let el = this.front(); el; el = el.nextElement) {
      array.push(callbackFunc.call(thisArg, el.key, el.value, i++));
    }
    return array;
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
    // @ts-ignore
    const element = {};

    __readonlyProp(element, "key", key);
    __readonlyProp(element, "value", value);
    __readonlyProp(element, "nextElement", undefined);
    __readonlyProp(element, "prevElement", undefined);

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

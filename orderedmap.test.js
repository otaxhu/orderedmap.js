import { OrderedMap } from "./orderedmap";

describe.each([
  {
    name: "ValidNew_UndefinedParam",
    param: undefined,
    expectsException: false,
  },
  {
    name: "ValidNew_OneKeyValue",
    param: [
      ["key1", "value1"],
    ],
    expectsException: false,
  },
  {
    name: "InvalidNew_NotIterableParam",
    param: {
      notIteratorObject: "notIteratorObject",
    },
    expectsException: true,
  },
])("new OrderedMap($param)", ({ name, param, expectsException }) => {
  test(name, () => {
    try {
      new OrderedMap(param);
    } catch (e) {
      if (!expectsException) {
        fail(`unexpected exception thrown: ${e}`);
      }
    }
  });
});

describe.each([
  {
    name: "ValidSet",
    keyParam: "test_key",
    valueParam: "test_value",
  },
])("OrderedMap#set($keyParam, $valueParam)", ({ name, keyParam, valueParam }) => {
  test(name, () => {

    const map = new OrderedMap();

    map.set(keyParam, valueParam);

  });
});

describe.each([
  {
    name: "ValidGet_FoundValue",
    keyParam: "test_key",
    initialKeyValues: [
      ["other_key", "value_1"],
      ["another_key", "value_2"],
      ["test_key", "test_value"],
      ["coffee", "from_java"],
    ],
    expectedReturn: "test_value",
  },
  {
    name: "ValidGet_NotFoundValue_WithInitialValues",
    keyParam: "test_key",
    initialKeyValues: [
      ["coffee", "from_java"],
    ],
    expectedReturn: undefined,
  },
  {
    name: "ValidGet_NotFoundValue_NoInitialValues",
    keyParam: "test_key",
    initialKeyValues: undefined,
    expectedReturn: undefined,
  },
])("OrderedMap#get($keyParam)", ({ name, keyParam, initialKeyValues, expectedReturn }) => {
  test(name, () => {

    const map = new OrderedMap(initialKeyValues);

    expect(map.get(keyParam)).toBe(expectedReturn);

  });
});

describe.each([
  {
    name: "ValidGetElement_FoundElement_PrevElementIsDefined_NextElementIsUndefined",
    keyParam: "test_key",
    initialValues: [
      ["some_key", "some_value"],
      ["coffee", "from_java"],
      ["other_key", "other_value"],
      ["test_key", "test_value"],
    ],
    expectedReturn: {
      key: "test_key",
      value: "test_value",
      prevElementIsDefined: true,
      nextElementIsDefined: false,
    },
  },
  {
    name: "ValidGetElement_FoundElement_PrevElementIsUndefined_NextElementIsUndefined",
    keyParam: "test_key",
    initialValues: [
      ["test_key", "test_value"],
    ],
    expectedReturn: {
      key: "test_key",
      value: "test_value",
      prevElementIsDefined: false,
      nextElementIsDefined: false,
    }
  },
  {
    name: "ValidGetElement_FoundElement_PrevElementIsUndefined_NextElementIsDefined",
    keyParam: "test_key",
    initialValues: [
      ["test_key", "test_value"],
      ["another_key", "another_value"],
    ],
    expectedReturn: {
      key: "test_key",
      value: "test_value",
      prevElementIsDefined: false,
      nextElementIsDefined: true,
    },
  },
  {
    name: "ValidGetElement_NotFoundElement_WithInitialValues",
    keyParam: "test_key",
    initialValues: [
      ["some_key", "some_value"],
      ["coffee", "from_java"],
      ["other_key", "other_value"],
    ],
    expectedReturn: undefined,
  },
  {
    name: "ValidGetElement_NotFoundElement_NoInitialValues",
    keyParam: "test_key",
    initialValues: undefined,
    expectedReturn: undefined,
  },
])("OrderedMap#getElement($keyParam)", ({ name, keyParam, initialValues, expectedReturn }) => {
  test(name, () => {

    const map = new OrderedMap(initialValues);

    const element = map.getElement(keyParam);

    if (!expectedReturn) {
      expect(element).toBeUndefined();
    } else {
      expect(element).toBeTruthy();
      expect(element?.key).toBe(expectedReturn.key);
      expect(element?.value).toBe(expectedReturn.value);
      if (expectedReturn.nextElementIsDefined) {
        expect(element?.nextElement).toBeTruthy();
      } else {
        expect(element?.nextElement).toBeUndefined();
      }
      if (expectedReturn.prevElementIsDefined) {
        expect(element?.prevElement).toBeTruthy();
      } else {
        expect(element?.prevElement).toBeUndefined();
      }
    }
  });
});

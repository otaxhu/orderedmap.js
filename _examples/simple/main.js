"use strict";

import { OrderedMap } from "../../orderedmap.js";

const myMap = new OrderedMap([
  ["key", "value"],
  ["key2", 123],
  ["key3", {
    foo: 123,
  }]
]);

// lastElement is the last element in the OrderedMap
const lastElement = myMap.back();
console.log(lastElement?.key, lastElement?.value);

// You can iterate from last to first element like this:
for (let el = lastElement; el; el = el.prevElement) {
  console.log(el.key, el.value);
}

// firstElement is the first element of the OrderedMap
const firstElement = myMap.front();
console.log(firstElement?.key, firstElement?.value);

// You can iterate from first to last element like this:
for (let el = firstElement; el; el = el.nextElement) {
  console.log(el.key, el.value);
}

// To know how much keys there are in the OrderedMap you can use #.size property to access it
console.log(myMap.size); // Outputs: 3

// You can delete a key and related value from the OrderedMap like this:
myMap.delete("key2");

console.log(myMap.size); // After deletion output: 2

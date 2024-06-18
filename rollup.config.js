import terser from "@rollup/plugin-terser";

export default {
  input: "orderedmap.js",
  output: [
    {
      file: "dist/orderedmap.umd.js",
      format: "umd",
      name: "OrderedMap",
    },
    {
      file: "dist/orderedmap.umd.min.js",
      format: "umd",
      name: "OrderedMap",
      plugins: [terser({keep_classnames: /^[^_].*/})],
    },
  ],
}

import { readFileSync } from "node:fs";
import path from "node:path";
import { builtinModules } from "node:module";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const getPackageJson = () => {
  try {
    return JSON.parse(readFileSync(path.resolve("package.json"), "utf-8"))
      .dependencies;
  } catch (err) {
    console.error("Occured error from 'getPacakgeJson'\n", err);
    process.exit(1);
  }
};

const externals = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
  ...Object.keys(getPackageJson() || {}),
];
export default {
  input: "build/app.js",
  external: (id) =>
    externals.includes(id) ||
    externals.some((dep) => id === dep || id.startsWith(`${dep}/`)),
  output: {
    file: "dist/app.js",
    format: "cjs",
    sourcemap: false,
    exports: "auto",
  },
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      extensions: [".mjs", ".cjs", ".js", ".ts", ".json"],
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: path.resolve("tsconfig.prod.json"),
      declaration: false,
      sourceMap: false,
    }),
    terser({
      format: {
        comments: false,
      },
      compress: {
        passes: 2,
        pure_getters: true,
      },
      ecma: 2020,
    }),
  ],
};

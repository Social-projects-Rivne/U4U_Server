
import pkg from "./package.json"
//import babel from "rollup-plugin-babel"

export default {
    input: "src/core.mjs",
    external: [
      ...Object.keys(pkg.dependencies)
    ],
    plugins: [
      //babel()
    ],
    output: {
      file: `${pkg.main}.js`,
      format: "cjs",
      exports: "named",
      sourcemap: true
    }
}
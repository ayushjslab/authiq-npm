import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "authiq",
    sourcemap: true,
  },
  external: ["react", "react-dom"],
  plugins: [typescript({ tsconfig: "tsconfig.json", declaration: true, declarationDir: "dist"  })],
});

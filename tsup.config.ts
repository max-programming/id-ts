import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/validators/zod.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
});

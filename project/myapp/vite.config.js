import { defineConfig } from "vite";
import { resolve } from "path";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [createVuePlugin()],
});

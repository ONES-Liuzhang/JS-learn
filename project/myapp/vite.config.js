import { defineConfig } from "vite";
import { resolve } from "path";
import { createVuePlugin } from "vite-plugin-vue2";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
    extensions: [".js", ".vue", ".jsx"],
  },
  plugins: [createVuePlugin(), vueJsx()],
});

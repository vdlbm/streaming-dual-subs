import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                content: "content.js"
            },
            output: {
                entryFileNames: "[name].js",
                format: "iife"
            }
        }
    }
});
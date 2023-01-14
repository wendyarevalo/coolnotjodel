import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    output: "server",
    server: {
        port: 7777,
        host: "0.0.0.0",
    },
});

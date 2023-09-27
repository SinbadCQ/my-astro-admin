import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const [, item] = process.env.npm_lifecycle_event.split(':')

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://SinbadCQ.github.io',
  // base: '/my-astro-admin',
  // root: `./src/items/${item}`,
  // srcDir: `./src/items/${item}`,
  publicDir: `./public`,
});
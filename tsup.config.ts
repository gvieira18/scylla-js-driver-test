import path from 'path';

import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  outDir: 'dist',
  format: 'cjs',
  cjsInterop: true,
  platform: 'node',
  target: 'node20',
  bundle: false,
  dts: false,
  minify: 'terser',
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: true,
  sourcemap: true,
  splitting: false,
  silent: false,
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  entry: ['src/**/*.ts'],
  skipNodeModulesBundle: true,
  loader: { '.json': 'copy' },
});

import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

// Library build for ania-avatar-vue.
//
// - Outputs ESM (dist/index.js) + UMD (dist/index.umd.cjs, global `AniaAvatarVue`).
// - `vue` is externalized (peerDependency).
// - `ania-avatar-core` is intentionally NOT externalized, so it is bundled into
//   our dist and the CDN/UMD build is fully self-contained.
export default defineConfig({
  // cssInjectedByJs inlines component <style> into the JS bundle so consumers
  // (and the CDN <script> build) get styles with zero extra CSS import.
  plugins: [vue(), cssInjectedByJs()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AniaAvatarVue',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.umd.cjs'),
    },
    rollupOptions: {
      // Externalize Vue only; bundle ania-avatar-core into our output.
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
    sourcemap: true,
    emptyOutDir: false, // keep dist/index.d.ts emitted by vue-tsc
  },
});

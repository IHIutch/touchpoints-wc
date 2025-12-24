import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'form-component.ts',
      name: 'FormComponent',
      fileName: 'form-component',
      formats: ['es']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  server: {
    open: true
  }
})
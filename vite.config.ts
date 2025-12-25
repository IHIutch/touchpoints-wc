import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetWind3, presetWind4 } from 'unocss'
import theme from './theme.json'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/form-component.ts',
      formats: ['es'],
      fileName: 'form-component'
    },
    rollupOptions: {
      external: /^lit/
    }
  },
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      theme: {
        colors: theme.colors
      },
      presets: [
        presetWind4({
          preflights: {
            "theme": {
              'mode': true
            },
            property: {
              parent: false
            },
          }
        }),
        presetIcons({
          scale: 1
        }),
      ]
    })
  ]
})
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetWind3 } from 'unocss'
import theme from './theme.json'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      fileName: 'index',
      formats: ['es'],
    },
  },
  plugins: [
    UnoCSS({
      mode: 'shadow-dom',
      theme: {
        colors: theme.colors
      },
      presets: [
        presetWind3(),
        presetIcons({
          scale: 1
        }),
      ]
    })
  ]
})
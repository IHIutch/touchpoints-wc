import { defineConfig } from 'tsdown/config'
import { presetIcons, presetWind3 } from 'unocss'
import UnoCSS from 'unocss/vite'
import theme from './theme.json'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  dts: true,
  minify: true,
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
    })],
})

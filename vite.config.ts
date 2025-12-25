import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetWind3 } from 'unocss'
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
        // presetWind4({
        //   preflights: {
        //     // reset: true,
        //     // theme: true,
        //     property: {
        //       parent: '@layer properties',
        //       selector: ':where(*, ::before, ::after)'
        //     }
        //     // property: {
        //     //   parent: false
        //     // }
        //   }
        // }),
        presetWind3(),
        presetIcons({
          scale: 1
        }),
      ]
    })
  ]
})
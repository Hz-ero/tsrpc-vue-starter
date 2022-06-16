import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // vue文件编译
import Unocss from 'unocss/vite' // uno css
import { presetAttributify, presetUno } from 'unocss'
import { resolve } from 'path' // node path
import Pages from 'vite-plugin-pages' // 文件路由
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // 环境变量存放路径
  envDir: './env',

  // 设置别名
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") }
    ]
  },

  // dev-server，端口，自动跳转页面
  server: {
    port: 3001,
    open: true
  },

  // 插件
  plugins: [
    vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: "src/views",
      importMode: "async",
      extendRoute(route) {
        if (route.path === '/') {
          return { ...route, redirect: "posts" }
        }
      }
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/type/auto-imports.d.ts",
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [NaiveUiResolver()],
      dirs: ["src/components"],
      directoryAsNamespace: true,
      dts: "src/type/components.d.ts",
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),

    // https://github.com/unocss/unocss
    Unocss({
      presets: [
        presetUno(),
        presetAttributify()
      ]
    })
  ]
})

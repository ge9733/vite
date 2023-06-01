import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import eslintPlugin from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps:{

  },
  plugins: [vue(),
   
  ],
  resolve: {
    // 路径别名配置
    alias: {
      '~styles': path.resolve('./src/assets/css'),
      static: path.resolve('./src/assets'),
      '@apis': path.resolve('./src/api'),
      '@comps': path.resolve('./src/components'),
      '@': path.resolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
        less: {
            modifyVars: {
                hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
            },
            javascriptEnabled: true,
        },
    },
},
  

})

import { defineConfig, normalizePath } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import postcssPresetEnv from "postcss-preset-env";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
const variablePath = normalizePath(path.normalize("./src/style/variable.scss"));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 配置src下存放svg的路径，这里表示在src/icons文件夹下
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      symbolId: "icon-[dir]-[name]"
    })
  ],
  resolve: {
    // 配置别名
    alias: {
      "@assets": path.join(__dirname, "src/assets")
    }
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnv()]
    },
    preprocessorOptions: {
      scss: {
        // additionalData的内容会在每个scss文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  },
  build: {
    outDir: "dist", // 指定打包路径，默认为项目根目录下的dist目录
    assetsInlineLimit: 4 * 1024, // 打包内联阈值4kb
    chunkSizeWarningLimit: 2000, // 规定触发警告的 chunk 大小, 消除打包大小超过500kb警告
    // minify: "esbuild", // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
    minify: "terser", // Vite 2.6.x 以上需要配置 minify："terser"，terserOptions才能生效，terser可以去除 console.log
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true // 生产环境去除 debugger
      },
      format: {
        comments: false // 删除注释
      }
    },
    // 静态资源打包到dist下的不同目录,将文件类型css、js、jpg等文件分开存储
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]"
      }
    }
  }
});

import { defineConfig, normalizePath, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { resolve } from "path";
import postcssPresetEnv from "postcss-preset-env";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { vitePluginForArco } from "@arco-plugins/vite-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
const themePath = normalizePath(path.normalize("./src/style/global-theme.scss"));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根路径
  const root = process.cwd();
  // 获取跟路径对应的文件
  const env = loadEnv(mode, root);
  return {
    // 开发或生产环境服务的公共基础路径
    base: env.VITE_PUBLIC_PATH,
    server: {
      // host: "0.0.0.0",
      // open: true,
      proxy: {}
    },
    plugins: [
      vue(),
      vitePluginForArco({
        style: "css"
      }),
      createSvgIconsPlugin({
        // 配置src下存放svg的路径，这里表示在src/assets/svgs文件夹下
        iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
        symbolId: "icon-[dir]-[name]"
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "vue-router"],
        resolvers: [ArcoResolver()],
        // 解决eslint报错问题
        eslintrc: {
          // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
          enabled: false,
          filepath: "./.eslintrc-auto-import.json", // 生成的文件路径
          globalsPropValue: true
        },
        // 配置文件生成位置
        dts: "src/auto-import.d.ts"
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ],
        // 自动加载组件的目录配置,默认的为 'src/components'
        dirs: ["src/components"],
        // 组件的有效文件扩展名
        extensions: ["vue"],
        // 配置文件生成位置
        dts: "src/components.d.ts"
      })
    ],
    resolve: {
      // 配置别名-绝对路径
      alias: {
        "@assets": path.join(__dirname, "src/assets"),
        "@": resolve(__dirname, "./src")
      }
    },
    css: {
      postcss: {
        plugins: [postcssPresetEnv()]
      },
      preprocessorOptions: {
        scss: {
          // additionalData的内容会在每个scss文件的开头自动注入
          additionalData: `@import "${themePath}";
          `
        }
      }
    },
    build: {
      outDir: "dist", // 指定打包路径，默认为项目根目录下的dist目录
      minify: "esbuild", // esbuild打包更快但是不能去除console.log，terser打包慢但能去除console.log
      // minify: "terser", // Vite 2.6.x 以上需要配置 minify："terser"，terserOptions才能生效，terser可以去除 console.log
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
      //     drop_console: true, // 生产环境去除 console
      //     drop_debugger: true // 生产环境去除 debugger
      //   },
      //   format: {
      //     comments: false // 删除注释
      //   }
      // },
      assetsInlineLimit: 4 * 1024, // 打包内联阈值4kb
      chunkSizeWarningLimit: 2000, // 规定触发警告的 chunk 大小, 消除打包大小超过500kb警告
      // 静态资源打包到dist下的不同目录,将文件类型css、js、jpg等文件分开存储
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});

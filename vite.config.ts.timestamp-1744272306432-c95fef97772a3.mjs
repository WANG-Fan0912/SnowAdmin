// vite.config.ts
import { defineConfig, normalizePath, loadEnv } from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2/node_modules/vite/dist/node/index.js";
import path from "path";
import { resolve as resolve2 } from "path";

// build/optimize.ts
var include = [
  "vue-codemirror6",
  "qrcode",
  "jsbarcode",
  "vuedraggable",
  "@wangeditor/editor",
  "fingerprintjs2",
  "xgplayer",
  "print-js",
  "@codemirror/theme-one-dark",
  "@codemirror/lang-json",
  "@codemirror/lang-javascript",
  "@codemirror/lang-vue",
  "pinyin-pro"
];

// vite.config.ts
import postcssPresetEnv from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/postcss-preset-env@9.5.2_postcss@8.4.38/node_modules/postcss-preset-env/dist/index.mjs";

// build/vite-plugin.ts
import vue from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2__vue@3.4.21_typescript@5.4.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { vitePluginForArco } from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/@arco-plugins+vite-vue@1.4.5/node_modules/@arco-plugins/vite-vue/lib/index.js";
import { createHtmlPlugin } from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2_/node_modules/vite-plugin-html/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import AutoImport from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@12.4.0_typescript@5.4.3__rollup@4.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import { ArcoResolver } from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.26.5_rollup@4.13.0_vue@3.4.21_typescript@5.4.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.26.5_rollup@4.13.0_vue@3.4.21_typescript@5.4.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { viteMockServe } from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@4.13.0_vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2_/node_modules/vite-plugin-mock/dist/index.js";
import eslintPlugin from "file:///D:/%E9%A1%B9%E7%9B%AE/SnowAdmin/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.57.0_vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2_/node_modules/vite-plugin-eslint/dist/index.mjs";
var createVitePlugins = (viteEnv) => {
  const env = viteEnv;
  return [
    vue(),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    vitePluginForArco({
      style: "css"
    }),
    // 提供ejs模板能力，用于index.html的标题显示
    createHtmlPlugin({
      inject: {
        data: {
          title: env.VITE_GLOB_APP_TITLE
        }
      }
    }),
    createSvgIconsPlugin({
      // 配置src下存放svg的路径，这里表示在src/assets/svgs文件夹下
      iconDirs: [resolve(process.cwd(), "src/assets/svgs")],
      symbolId: "icon-[dir]-[name]"
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue", "vue-router"],
      // 自动导入的目录-自定义全局函数
      dirs: ["src/globals"],
      // arco组件的按需加载
      resolvers: [ArcoResolver()],
      // 解决eslint报错问题
      eslintrc: {
        // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
        enabled: false,
        filepath: "./.eslintrc-auto-import.json",
        // 生成的文件路径
        globalsPropValue: true
      },
      // 配置文件生成位置
      dts: "src/auto-import.d.ts"
    }),
    Components({
      resolvers: [
        // arco组件的按需加载
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
    }),
    viteMockServe({
      mockPath: "./src/mock/",
      // 目录位置
      logger: true,
      //  是否在控制台显示请求日志
      supportTs: true,
      // 是否读取ts文件模块
      localEnabled: env.VITE_APP_OPEN_MOCK === "true",
      // 设置是否启用本地mock文件
      prodEnabled: env.VITE_APP_OPEN_MOCK === "true",
      // 设置打包是否启用mock功能
      // 这样可以控制关闭mock的时候不让mock打包到最终代码内
      injectCode: `
          import { setupProdMockServer } from '../src/mock/index';
          setupProdMockServer();
        `
    })
  ];
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\\u9879\u76EE\\SnowAdmin";
var themePath = normalizePath(path.normalize("./src/style/global-theme.scss"));
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    // 生产环境服务的公共基础路径-用于生出环境的代理的路径
    base: env.VITE_PUBLIC_PATH,
    server: {
      host: "0.0.0.0",
      open: false,
      // 为开发服务器配置自定义代理规则-用于开发时的代理
      proxy: {
        "/api": {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    // 插件：路径build/vite-plugin
    plugins: createVitePlugins(env),
    resolve: {
      // 配置别名-绝对路径
      alias: {
        "@assets": path.join(__vite_injected_original_dirname, "src/assets"),
        "@": resolve2(__vite_injected_original_dirname, "./src")
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
    // 依赖预加载 https://cn.vitejs.dev/config/dep-optimization-options.html#dep-optimization-options
    optimizeDeps: {
      include
    },
    build: {
      outDir: "dist",
      // 指定打包路径，默认为项目根目录下的dist目录
      // minify: "esbuild", // esbuild打包更快但是不能去除console.log，terser打包慢但能去除console.log
      minify: "terser",
      // Vite 2.6.x 以上需要配置 minify："terser"，terserOptions才能生效，terser可以去除 console.log
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true,
          // 生产环境去除 console
          drop_debugger: true
          // 生产环境去除 debugger
        },
        format: {
          comments: false
          // 删除注释
        }
      },
      assetsInlineLimit: 50 * 1024,
      // 打包内联阈值100kb
      chunkSizeWarningLimit: 5e4,
      // 规定触发警告的 chunk 大小, 这里设置阈值为50kb, 消除打包大小超过500kb警告
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvb3B0aW1pemUudHMiLCAiYnVpbGQvdml0ZS1wbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTk4NzlcdTc2RUVcXFxcU25vd0FkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTk4NzlcdTc2RUVcXFxcU25vd0FkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTklQTElQjklRTclOUIlQUUvU25vd0FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBub3JtYWxpemVQYXRoLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGluY2x1ZGUgfSBmcm9tIFwiLi9idWlsZC9vcHRpbWl6ZVwiO1xyXG5pbXBvcnQgcG9zdGNzc1ByZXNldEVudiBmcm9tIFwicG9zdGNzcy1wcmVzZXQtZW52XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVZpdGVQbHVnaW5zIH0gZnJvbSBcIi4vYnVpbGQvdml0ZS1wbHVnaW5cIjtcclxuY29uc3QgdGhlbWVQYXRoID0gbm9ybWFsaXplUGF0aChwYXRoLm5vcm1hbGl6ZShcIi4vc3JjL3N0eWxlL2dsb2JhbC10aGVtZS5zY3NzXCIpKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICAvLyBcdTY4MzlcdThERUZcdTVGODRcclxuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcclxuICAvLyBcdTgzQjdcdTUzRDZcdThEREZcdThERUZcdTVGODRcdTVCRjlcdTVFOTRcdTc2ODRcdTY1ODdcdTRFRjZcclxuICBjb25zdCBlbnY6IGFueSA9IGxvYWRFbnYobW9kZSwgcm9vdCk7XHJcbiAgcmV0dXJuIHtcclxuICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NjcwRFx1NTJBMVx1NzY4NFx1NTE2Q1x1NTE3MVx1NTdGQVx1Nzg0MFx1OERFRlx1NUY4NC1cdTc1MjhcdTRFOEVcdTc1MUZcdTUxRkFcdTczQUZcdTU4ODNcdTc2ODRcdTRFRTNcdTc0MDZcdTc2ODRcdThERUZcdTVGODRcclxuICAgIGJhc2U6IGVudi5WSVRFX1BVQkxJQ19QQVRILFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxyXG4gICAgICBvcGVuOiBmYWxzZSxcclxuICAgICAgLy8gXHU0RTNBXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MTREXHU3RjZFXHU4MUVBXHU1QjlBXHU0RTQ5XHU0RUUzXHU3NDA2XHU4OUM0XHU1MjE5LVx1NzUyOFx1NEU4RVx1NUYwMFx1NTNEMVx1NjVGNlx1NzY4NFx1NEVFM1x1NzQwNlxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9CQVNFX1VSTCxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIilcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBcdTYzRDJcdTRFRjZcdUZGMUFcdThERUZcdTVGODRidWlsZC92aXRlLXBsdWdpblxyXG4gICAgcGx1Z2luczogY3JlYXRlVml0ZVBsdWdpbnMoZW52KSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgLy8gXHU5MTREXHU3RjZFXHU1MjJCXHU1NDBELVx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFxyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQGFzc2V0c1wiOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInNyYy9hc3NldHNcIiksXHJcbiAgICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcG9zdGNzczoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtwb3N0Y3NzUHJlc2V0RW52KCldXHJcbiAgICAgIH0sXHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YVx1NzY4NFx1NTE4NVx1NUJCOVx1NEYxQVx1NTcyOFx1NkJDRlx1NEUyQXNjc3NcdTY1ODdcdTRFRjZcdTc2ODRcdTVGMDBcdTU5MzRcdTgxRUFcdTUyQThcdTZDRThcdTUxNjVcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIiR7dGhlbWVQYXRofVwiO1xyXG4gICAgICAgICAgYFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIFx1NEY5RFx1OEQ1Nlx1OTg4NFx1NTJBMFx1OEY3RCBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnL2RlcC1vcHRpbWl6YXRpb24tb3B0aW9ucy5odG1sI2RlcC1vcHRpbWl6YXRpb24tb3B0aW9uc1xyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGVcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBvdXREaXI6IFwiZGlzdFwiLCAvLyBcdTYzMDdcdTVCOUFcdTYyNTNcdTUzMDVcdThERUZcdTVGODRcdUZGMENcdTlFRDhcdThCQTRcdTRFM0FcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODRkaXN0XHU3NkVFXHU1RjU1XHJcbiAgICAgIC8vIG1pbmlmeTogXCJlc2J1aWxkXCIsIC8vIGVzYnVpbGRcdTYyNTNcdTUzMDVcdTY2RjRcdTVGRUJcdTRGNDZcdTY2MkZcdTRFMERcdTgwRkRcdTUzQkJcdTk2NjRjb25zb2xlLmxvZ1x1RkYwQ3RlcnNlclx1NjI1M1x1NTMwNVx1NjE2Mlx1NEY0Nlx1ODBGRFx1NTNCQlx1OTY2NGNvbnNvbGUubG9nXHJcbiAgICAgIG1pbmlmeTogXCJ0ZXJzZXJcIiwgLy8gVml0ZSAyLjYueCBcdTRFRTVcdTRFMEFcdTk3MDBcdTg5ODFcdTkxNERcdTdGNkUgbWluaWZ5XHVGRjFBXCJ0ZXJzZXJcIlx1RkYwQ3RlcnNlck9wdGlvbnNcdTYyNERcdTgwRkRcdTc1MUZcdTY1NDhcdUZGMEN0ZXJzZXJcdTUzRUZcdTRFRTVcdTUzQkJcdTk2NjQgY29uc29sZS5sb2dcclxuICAgICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgICBrZWVwX2luZmluaXR5OiB0cnVlLCAvLyBcdTk2MzJcdTZCNjIgSW5maW5pdHkgXHU4OEFCXHU1MzhCXHU3RjI5XHU2MjEwIDEvMFx1RkYwQ1x1OEZEOVx1NTNFRlx1ODBGRFx1NEYxQVx1NUJGQ1x1ODFGNCBDaHJvbWUgXHU0RTBBXHU3Njg0XHU2MDI3XHU4MEZEXHU5NUVFXHU5ODk4XHJcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NTNCQlx1OTY2NCBjb25zb2xlXHJcbiAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NTNCQlx1OTY2NCBkZWJ1Z2dlclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybWF0OiB7XHJcbiAgICAgICAgICBjb21tZW50czogZmFsc2UgLy8gXHU1MjIwXHU5NjY0XHU2Q0U4XHU5MUNBXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBhc3NldHNJbmxpbmVMaW1pdDogNTAgKiAxMDI0LCAvLyBcdTYyNTNcdTUzMDVcdTUxODVcdTgwNTRcdTk2MDhcdTUwM0MxMDBrYlxyXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMDAwLCAvLyBcdTg5QzRcdTVCOUFcdTg5RTZcdTUzRDFcdThCNjZcdTU0NEFcdTc2ODQgY2h1bmsgXHU1OTI3XHU1QzBGLCBcdThGRDlcdTkxQ0NcdThCQkVcdTdGNkVcdTk2MDhcdTUwM0NcdTRFM0E1MGtiLCBcdTZEODhcdTk2NjRcdTYyNTNcdTUzMDVcdTU5MjdcdTVDMEZcdThEODVcdThGQzc1MDBrYlx1OEI2Nlx1NTQ0QVxyXG4gICAgICAvLyBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTYyNTNcdTUzMDVcdTUyMzBkaXN0XHU0RTBCXHU3Njg0XHU0RTBEXHU1NDBDXHU3NkVFXHU1RjU1LFx1NUMwNlx1NjU4N1x1NEVGNlx1N0M3Qlx1NTc4QmNzc1x1MzAwMWpzXHUzMDAxanBnXHU3QjQ5XHU2NTg3XHU0RUY2XHU1MjA2XHU1RjAwXHU1QjU4XHU1MEE4XHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IFwic3RhdGljL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF1cIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFx1OTg3OVx1NzZFRVxcXFxTbm93QWRtaW5cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1OTg3OVx1NzZFRVxcXFxTbm93QWRtaW5cXFxcYnVpbGRcXFxcb3B0aW1pemUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFOSVBMSVCOSVFNyU5QiVBRS9Tbm93QWRtaW4vYnVpbGQvb3B0aW1pemUudHNcIjsvKipcbiAqIGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvZGVwLW9wdGltaXphdGlvbi1vcHRpb25zI29wdGltaXplZGVwcy1leGNsdWRlXG4gKiBcdTU3MjggVml0ZSBcdTc2ODRcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjYgdml0ZS5jb25maWcudHMgXHU0RTJEXHVGRjBDb3B0aW1pemVEZXBzIFx1OTAwOVx1OTg3OVx1NzUyOFx1NEU4RVx1OTE0RFx1N0Y2RVx1NEY5RFx1OEQ1Nlx1NEYxOFx1NTMxNlx1RkYwQ1x1NzI3OVx1NTIyQlx1NjYyRlx1OTg4NFx1Njc4NFx1NUVGQVx1NkI2NVx1OUFBNFx1RkYwQ1x1NEVFNVx1NjNEMFx1OUFEOFx1NUYwMFx1NTNEMVx1NTQ4Q1x1Njc4NFx1NUVGQVx1NjAyN1x1ODBGRFx1MzAwMlxuICogXHU4RkQ5XHU3OUNEXHU2MEM1XHU1MUI1XHU1QzI0XHU1MTc2XHU5NzAwXHU4OTgxXHU2Q0U4XHU2MTBGXHVGRjBDXHU1RjUzXHU0RjYwXHU3OTgxXHU2QjYyXHU2RDRGXHU4OUM4XHU1NjY4XHU3RjEzXHU1QjU4XHU2NUY2XHU1QzMxXHU1RkM1XHU5ODdCXHU1QzA2XHU1QkY5XHU1RTk0XHU2QTIxXHU1NzU3XHU1MkEwXHU4RjdEXHU1MjMwXHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXHVGRjBDXHU1NDI2XHU1MjE5XHU4REYzXHU4RjZDXHU2NUY2XHU0RjFBXHU5ODkxXHU3RTQxXHU1MUZBXHU3M0IwXHU5ODc1XHU5NzYyXHU1MjM3XHU2NUIwXHU3Njg0XHU5NUVFXHU5ODk4XHVGRjBDXHU1NkUwXHU0RTNBXHU1QjgzXHU2NUUwXHU2Q0Q1XHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU3RjEzXHU1QjU4XHU0RTVGXHU2Q0ExXHU2NzA5XHU1NzI4XHU2NzJDXHU1NzMwbm9kZV9tb2R1bGVzLy52aXRlXHU1MTg1XHU3RjEzXHU1QjU4XHUzMDAyXG4gKiBcdTU5ODJcdTY3OUNcdTRGN0ZcdTc1MjhcdTc2ODRcdTdCMkNcdTRFMDlcdTY1QjlcdTVFOTNcdTY2MkZcdTUxNjhcdTVDNDBcdTVGMTVcdTUxNjVcdUZGMENcdTRFNUZcdTVDMzFcdTY2MkZzcmMvbWFpbi50c1x1NjU4N1x1NEVGNlx1OTFDQ1x1RkYwQ1x1OTBBM1x1NEU0OFx1NUI4M1x1NUMzMVx1NEYxQVx1ODFFQVx1NTJBOFx1ODhBQnZpdGVcdTdGMTNcdTVCNThcdTUyMzBub2RlX21vZHVsZXMvLnZpdGVcdUZGMENcdTZCNjRcdTY1RjZcdTVDMzFcdTRFMERcdTc1MjhcdTVDMDZcdThCRTVcdTdCMkNcdTRFMDlcdTY1QjlcdTVFOTNcdTUwNUFcdTRGOURcdThENTZcdTk4ODRcdTY3ODRcdTVFRkEoXHU2REZCXHU1MkEwXHU1MjMwaW5jbHVkZVx1NTE4NSlcdTMwMDJcbiAqL1xuY29uc3QgaW5jbHVkZSA9IFtcbiAgXCJ2dWUtY29kZW1pcnJvcjZcIixcbiAgXCJxcmNvZGVcIixcbiAgXCJqc2JhcmNvZGVcIixcbiAgXCJ2dWVkcmFnZ2FibGVcIixcbiAgXCJAd2FuZ2VkaXRvci9lZGl0b3JcIixcbiAgXCJmaW5nZXJwcmludGpzMlwiLFxuICBcInhncGxheWVyXCIsXG4gIFwicHJpbnQtanNcIixcbiAgXCJAY29kZW1pcnJvci90aGVtZS1vbmUtZGFya1wiLFxuICBcIkBjb2RlbWlycm9yL2xhbmctanNvblwiLFxuICBcIkBjb2RlbWlycm9yL2xhbmctamF2YXNjcmlwdFwiLFxuICBcIkBjb2RlbWlycm9yL2xhbmctdnVlXCIsXG4gIFwicGlueWluLXByb1wiXG5dO1xuXG4vKipcbiAqIFx1NTcyOFx1OTg4NFx1Njc4NFx1NUVGQVx1NEUyRFx1NUYzQVx1NTIzNlx1NjM5Mlx1OTY2NFx1NzY4NFx1NEY5RFx1OEQ1Nlx1OTg3OVxuICogXHU1OTgyXHU2NzlDXHU0RjYwXHU2NzA5XHU2N0QwXHU0RTlCXHU0RjlEXHU4RDU2XHU1MzA1XHU0RTBEXHU1RTBDXHU2NzFCXHU4OEFCXHU5ODg0XHU2Nzg0XHU1RUZBXHVGRjBDXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IGV4Y2x1ZGUgXHU1QzVFXHU2MDI3XHU2NzY1XHU2MzkyXHU5NjY0XHU1QjgzXHU0RUVDXHUzMDAyXG4gKi9cbi8vIGNvbnN0IGV4Y2x1ZGUgPSBbXTtcblxuZXhwb3J0IHsgaW5jbHVkZSB9O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTk4NzlcdTc2RUVcXFxcU25vd0FkbWluXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxcdTk4NzlcdTc2RUVcXFxcU25vd0FkbWluXFxcXGJ1aWxkXFxcXHZpdGUtcGx1Z2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8lRTklQTElQjklRTclOUIlQUUvU25vd0FkbWluL2J1aWxkL3ZpdGUtcGx1Z2luLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyB2aXRlUGx1Z2luRm9yQXJjbyB9IGZyb20gXCJAYXJjby1wbHVnaW5zL3ZpdGUtdnVlXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4taHRtbFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcclxuaW1wb3J0IHsgQXJjb1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2tcIjtcclxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XHJcbi8qKlxyXG4gKiBcdTUyMUJcdTVFRkEgdml0ZSBcdTYzRDJcdTRFRjZcclxuICogQHBhcmFtIHZpdGVFbnZcclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVWaXRlUGx1Z2lucyA9ICh2aXRlRW52OiBWaXRlRW52KTogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0+IHtcclxuICBjb25zdCBlbnYgPSB2aXRlRW52O1xyXG4gIHJldHVybiBbXHJcbiAgICB2dWUoKSxcclxuICAgIC8vIGVzTGludCBcdTYyQTVcdTk1MTlcdTRGRTFcdTYwNkZcdTY2M0VcdTc5M0FcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTc1NENcdTk3NjJcdTRFMEFcclxuICAgIGVzbGludFBsdWdpbigpLFxyXG4gICAgdml0ZVBsdWdpbkZvckFyY28oe1xyXG4gICAgICBzdHlsZTogXCJjc3NcIlxyXG4gICAgfSksXHJcbiAgICAvLyBcdTYzRDBcdTRGOUJlanNcdTZBMjFcdTY3N0ZcdTgwRkRcdTUyOUJcdUZGMENcdTc1MjhcdTRFOEVpbmRleC5odG1sXHU3Njg0XHU2ODA3XHU5ODk4XHU2NjNFXHU3OTNBXHJcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgaW5qZWN0OiB7XHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdGl0bGU6IGVudi5WSVRFX0dMT0JfQVBQX1RJVExFXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgLy8gXHU5MTREXHU3RjZFc3JjXHU0RTBCXHU1QjU4XHU2NTNFc3ZnXHU3Njg0XHU4REVGXHU1Rjg0XHVGRjBDXHU4RkQ5XHU5MUNDXHU4ODY4XHU3OTNBXHU1NzI4c3JjL2Fzc2V0cy9zdmdzXHU2NTg3XHU0RUY2XHU1OTM5XHU0RTBCXHJcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9hc3NldHMvc3Znc1wiKV0sXHJcbiAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCJcclxuICAgIH0pLFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBWdWUgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBcmVmLCByZWFjdGl2ZSwgdG9SZWYgXHU3QjQ5XHJcbiAgICAgIGltcG9ydHM6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIl0sXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NzY4NFx1NzZFRVx1NUY1NS1cdTgxRUFcdTVCOUFcdTRFNDlcdTUxNjhcdTVDNDBcdTUxRkRcdTY1NzBcclxuICAgICAgZGlyczogW1wic3JjL2dsb2JhbHNcIl0sXHJcbiAgICAgIC8vIGFyY29cdTdFQzRcdTRFRjZcdTc2ODRcdTYzMDlcdTk3MDBcdTUyQTBcdThGN0RcclxuICAgICAgcmVzb2x2ZXJzOiBbQXJjb1Jlc29sdmVyKCldLFxyXG4gICAgICAvLyBcdTg5RTNcdTUxQjNlc2xpbnRcdTYyQTVcdTk1MTlcdTk1RUVcdTk4OThcclxuICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAvLyBcdThGRDlcdTkxQ0NcdTUxNDhcdThCQkVcdTdGNkVcdTYyMTB0cnVlXHU3MTM2XHU1NDBFbnBtIHJ1biBkZXYgXHU4RkQwXHU4ODRDXHU0RTRCXHU1NDBFXHU0RjFBXHU3NTFGXHU2MjEwIC5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uIFx1NjU4N1x1NEVGNlx1NEU0Qlx1NTQwRVx1RkYwQ1x1NTcyOFx1NjUzOVx1NEUzQWZhbHNlXHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgZmlsZXBhdGg6IFwiLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvblwiLCAvLyBcdTc1MUZcdTYyMTBcdTc2ODRcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcclxuICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1NEY0RFx1N0Y2RVxyXG4gICAgICBkdHM6IFwic3JjL2F1dG8taW1wb3J0LmQudHNcIlxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgLy8gYXJjb1x1N0VDNFx1NEVGNlx1NzY4NFx1NjMwOVx1OTcwMFx1NTJBMFx1OEY3RFxyXG4gICAgICAgIEFyY29SZXNvbHZlcih7XHJcbiAgICAgICAgICBzaWRlRWZmZWN0OiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgXSxcclxuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1MkEwXHU4RjdEXHU3RUM0XHU0RUY2XHU3Njg0XHU3NkVFXHU1RjU1XHU5MTREXHU3RjZFLFx1OUVEOFx1OEJBNFx1NzY4NFx1NEUzQSAnc3JjL2NvbXBvbmVudHMnXHJcbiAgICAgIGRpcnM6IFtcInNyYy9jb21wb25lbnRzXCJdLFxyXG4gICAgICAvLyBcdTdFQzRcdTRFRjZcdTc2ODRcdTY3MDlcdTY1NDhcdTY1ODdcdTRFRjZcdTYyNjlcdTVDNTVcdTU0MERcclxuICAgICAgZXh0ZW5zaW9uczogW1widnVlXCJdLFxyXG4gICAgICAvLyBcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdTRGNERcdTdGNkVcclxuICAgICAgZHRzOiBcInNyYy9jb21wb25lbnRzLmQudHNcIlxyXG4gICAgfSksXHJcbiAgICB2aXRlTW9ja1NlcnZlKHtcclxuICAgICAgbW9ja1BhdGg6IFwiLi9zcmMvbW9jay9cIiwgLy8gXHU3NkVFXHU1RjU1XHU0RjREXHU3RjZFXHJcbiAgICAgIGxvZ2dlcjogdHJ1ZSwgLy8gIFx1NjYyRlx1NTQyNlx1NTcyOFx1NjNBN1x1NTIzNlx1NTNGMFx1NjYzRVx1NzkzQVx1OEJGN1x1NkM0Mlx1NjVFNVx1NUZEN1xyXG4gICAgICBzdXBwb3J0VHM6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1OEJGQlx1NTNENnRzXHU2NTg3XHU0RUY2XHU2QTIxXHU1NzU3XHJcbiAgICAgIGxvY2FsRW5hYmxlZDogZW52LlZJVEVfQVBQX09QRU5fTU9DSyA9PT0gXCJ0cnVlXCIsIC8vIFx1OEJCRVx1N0Y2RVx1NjYyRlx1NTQyNlx1NTQyRlx1NzUyOFx1NjcyQ1x1NTczMG1vY2tcdTY1ODdcdTRFRjZcclxuICAgICAgcHJvZEVuYWJsZWQ6IGVudi5WSVRFX0FQUF9PUEVOX01PQ0sgPT09IFwidHJ1ZVwiLCAvLyBcdThCQkVcdTdGNkVcdTYyNTNcdTUzMDVcdTY2MkZcdTU0MjZcdTU0MkZcdTc1Mjhtb2NrXHU1MjlGXHU4MEZEXHJcbiAgICAgIC8vIFx1OEZEOVx1NjgzN1x1NTNFRlx1NEVFNVx1NjNBN1x1NTIzNlx1NTE3M1x1OTVFRG1vY2tcdTc2ODRcdTY1RjZcdTUwMTlcdTRFMERcdThCQTltb2NrXHU2MjUzXHU1MzA1XHU1MjMwXHU2NzAwXHU3RUM4XHU0RUUzXHU3ODAxXHU1MTg1XHJcbiAgICAgIGluamVjdENvZGU6IGBcclxuICAgICAgICAgIGltcG9ydCB7IHNldHVwUHJvZE1vY2tTZXJ2ZXIgfSBmcm9tICcuLi9zcmMvbW9jay9pbmRleCc7XHJcbiAgICAgICAgICBzZXR1cFByb2RNb2NrU2VydmVyKCk7XHJcbiAgICAgICAgYFxyXG4gICAgfSlcclxuICBdO1xyXG59O1xyXG4iXSwKICAi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

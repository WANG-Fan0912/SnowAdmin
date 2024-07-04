// vite.config.ts
import { defineConfig, normalizePath, loadEnv } from "file:///E:/%E9%A1%B9%E7%9B%AE/dc-admin/node_modules/.pnpm/vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/%E9%A1%B9%E7%9B%AE/dc-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2__vue@3.4.21_typescript@5.4.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { resolve } from "path";
import postcssPresetEnv from "file:///E:/%E9%A1%B9%E7%9B%AE/dc-admin/node_modules/.pnpm/postcss-preset-env@9.5.2_postcss@8.4.38/node_modules/postcss-preset-env/dist/index.mjs";
import AutoImport from "file:///E:/%E9%A1%B9%E7%9B%AE/dc-admin/node_modules/.pnpm/unplugin-auto-import@0.17.5_rollup@4.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/%E9%A1%B9%E7%9B%AE/dc-admin/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.24.1_rollup@4.13.0_vue@3.4.21_typescript@5.4.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { ArcoResolver } from "file:///E:/%E9%A1%B9%E7%9B%AE/dc-admin/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.24.1_rollup@4.13.0_vue@3.4.21_typescript@5.4.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import { vitePluginForArco } from "file:///E:/%E9%A1%B9%E7%9B%AE/dc-admin/node_modules/.pnpm/@arco-plugins+vite-vue@1.4.5/node_modules/@arco-plugins/vite-vue/lib/index.js";
import { createSvgIconsPlugin } from "file:///E:/%E9%A1%B9%E7%9B%AE/dc-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.2_@types+node@20.11.30_sass@1.72.0_terser@5.29.2_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\\u9879\u76EE\\dc-admin";
var themePath = normalizePath(path.normalize("./src/style/global-theme.scss"));
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
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
          filepath: "./.eslintrc-auto-import.json",
          // 生成的文件路径
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
        "@assets": path.join(__vite_injected_original_dirname, "src/assets"),
        "@": resolve(__vite_injected_original_dirname, "./src")
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
      outDir: "dist",
      // 指定打包路径，默认为项目根目录下的dist目录
      minify: "esbuild",
      // esbuild打包更快但是不能去除console.log，terser打包慢但能去除console.log
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
      assetsInlineLimit: 4 * 1024,
      // 打包内联阈值4kb
      chunkSizeWarningLimit: 2e3,
      // 规定触发警告的 chunk 大小, 消除打包大小超过500kb警告
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTk4NzlcdTc2RUVcXFxcZGMtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFx1OTg3OVx1NzZFRVxcXFxkYy1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovJUU5JUExJUI5JUU3JTlCJUFFL2RjLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBub3JtYWxpemVQYXRoLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgcG9zdGNzc1ByZXNldEVudiBmcm9tIFwicG9zdGNzcy1wcmVzZXQtZW52XCI7XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XHJcbmltcG9ydCB7IEFyY29SZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcclxuaW1wb3J0IHsgdml0ZVBsdWdpbkZvckFyY28gfSBmcm9tIFwiQGFyY28tcGx1Z2lucy92aXRlLXZ1ZVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcclxuY29uc3QgdGhlbWVQYXRoID0gbm9ybWFsaXplUGF0aChwYXRoLm5vcm1hbGl6ZShcIi4vc3JjL3N0eWxlL2dsb2JhbC10aGVtZS5zY3NzXCIpKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICAvLyBcdTY4MzlcdThERUZcdTVGODRcclxuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcclxuICAvLyBcdTgzQjdcdTUzRDZcdThEREZcdThERUZcdTVGODRcdTVCRjlcdTVFOTRcdTc2ODRcdTY1ODdcdTRFRjZcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpO1xyXG4gIHJldHVybiB7XHJcbiAgICAvLyBcdTVGMDBcdTUzRDFcdTYyMTZcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTY3MERcdTUyQTFcdTc2ODRcdTUxNkNcdTUxNzFcdTU3RkFcdTc4NDBcdThERUZcdTVGODRcclxuICAgIGJhc2U6IGVudi5WSVRFX1BVQkxJQ19QQVRILFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIC8vIGhvc3Q6IFwiMC4wLjAuMFwiLFxyXG4gICAgICAvLyBvcGVuOiB0cnVlLFxyXG4gICAgICBwcm94eToge31cclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICB2aXRlUGx1Z2luRm9yQXJjbyh7XHJcbiAgICAgICAgc3R5bGU6IFwiY3NzXCJcclxuICAgICAgfSksXHJcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICAvLyBcdTkxNERcdTdGNkVzcmNcdTRFMEJcdTVCNThcdTY1M0VzdmdcdTc2ODRcdThERUZcdTVGODRcdUZGMENcdThGRDlcdTkxQ0NcdTg4NjhcdTc5M0FcdTU3MjhzcmMvYXNzZXRzL3N2Z3NcdTY1ODdcdTRFRjZcdTU5MzlcdTRFMEJcclxuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9hc3NldHMvc3Znc1wiKV0sXHJcbiAgICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxyXG4gICAgICB9KSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IFZ1ZSBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFyZWYsIHJlYWN0aXZlLCB0b1JlZiBcdTdCNDlcclxuICAgICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCJdLFxyXG4gICAgICAgIHJlc29sdmVyczogW0FyY29SZXNvbHZlcigpXSxcclxuICAgICAgICAvLyBcdTg5RTNcdTUxQjNlc2xpbnRcdTYyQTVcdTk1MTlcdTk1RUVcdTk4OThcclxuICAgICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgICAgLy8gXHU4RkQ5XHU5MUNDXHU1MTQ4XHU4QkJFXHU3RjZFXHU2MjEwdHJ1ZVx1NzEzNlx1NTQwRW5wbSBydW4gZGV2IFx1OEZEMFx1ODg0Q1x1NEU0Qlx1NTQwRVx1NEYxQVx1NzUxRlx1NjIxMCAuZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbiBcdTY1ODdcdTRFRjZcdTRFNEJcdTU0MEVcdUZGMENcdTU3MjhcdTY1MzlcdTRFM0FmYWxzZVxyXG4gICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICBmaWxlcGF0aDogXCIuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uXCIsIC8vIFx1NzUxRlx1NjIxMFx1NzY4NFx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFxyXG4gICAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU3NTFGXHU2MjEwXHU0RjREXHU3RjZFXHJcbiAgICAgICAgZHRzOiBcInNyYy9hdXRvLWltcG9ydC5kLnRzXCJcclxuICAgICAgfSksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgICAgQXJjb1Jlc29sdmVyKHtcclxuICAgICAgICAgICAgc2lkZUVmZmVjdDogdHJ1ZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICBdLFxyXG4gICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NTJBMFx1OEY3RFx1N0VDNFx1NEVGNlx1NzY4NFx1NzZFRVx1NUY1NVx1OTE0RFx1N0Y2RSxcdTlFRDhcdThCQTRcdTc2ODRcdTRFM0EgJ3NyYy9jb21wb25lbnRzJ1xyXG4gICAgICAgIGRpcnM6IFtcInNyYy9jb21wb25lbnRzXCJdLFxyXG4gICAgICAgIC8vIFx1N0VDNFx1NEVGNlx1NzY4NFx1NjcwOVx1NjU0OFx1NjU4N1x1NEVGNlx1NjI2OVx1NUM1NVx1NTQwRFxyXG4gICAgICAgIGV4dGVuc2lvbnM6IFtcInZ1ZVwiXSxcclxuICAgICAgICAvLyBcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdTRGNERcdTdGNkVcclxuICAgICAgICBkdHM6IFwic3JjL2NvbXBvbmVudHMuZC50c1wiXHJcbiAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAvLyBcdTkxNERcdTdGNkVcdTUyMkJcdTU0MEQtXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAYXNzZXRzXCI6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwic3JjL2Fzc2V0c1wiKSxcclxuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwb3N0Y3NzOiB7XHJcbiAgICAgICAgcGx1Z2luczogW3Bvc3Rjc3NQcmVzZXRFbnYoKV1cclxuICAgICAgfSxcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIC8vIGFkZGl0aW9uYWxEYXRhXHU3Njg0XHU1MTg1XHU1QkI5XHU0RjFBXHU1NzI4XHU2QkNGXHU0RTJBc2Nzc1x1NjU4N1x1NEVGNlx1NzY4NFx1NUYwMFx1NTkzNFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE2NVxyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiJHt0aGVtZVBhdGh9XCI7XHJcbiAgICAgICAgICBgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiBcImRpc3RcIiwgLy8gXHU2MzA3XHU1QjlBXHU2MjUzXHU1MzA1XHU4REVGXHU1Rjg0XHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTNBXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU3Njg0ZGlzdFx1NzZFRVx1NUY1NVxyXG4gICAgICBtaW5pZnk6IFwiZXNidWlsZFwiLCAvLyBlc2J1aWxkXHU2MjUzXHU1MzA1XHU2NkY0XHU1RkVCXHU0RjQ2XHU2NjJGXHU0RTBEXHU4MEZEXHU1M0JCXHU5NjY0Y29uc29sZS5sb2dcdUZGMEN0ZXJzZXJcdTYyNTNcdTUzMDVcdTYxNjJcdTRGNDZcdTgwRkRcdTUzQkJcdTk2NjRjb25zb2xlLmxvZ1xyXG4gICAgICAvLyBtaW5pZnk6IFwidGVyc2VyXCIsIC8vIFZpdGUgMi42LnggXHU0RUU1XHU0RTBBXHU5NzAwXHU4OTgxXHU5MTREXHU3RjZFIG1pbmlmeVx1RkYxQVwidGVyc2VyXCJcdUZGMEN0ZXJzZXJPcHRpb25zXHU2MjREXHU4MEZEXHU3NTFGXHU2NTQ4XHVGRjBDdGVyc2VyXHU1M0VGXHU0RUU1XHU1M0JCXHU5NjY0IGNvbnNvbGUubG9nXHJcbiAgICAgIC8vIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgLy8gICBjb21wcmVzczoge1xyXG4gICAgICAvLyAgICAga2VlcF9pbmZpbml0eTogdHJ1ZSwgLy8gXHU5NjMyXHU2QjYyIEluZmluaXR5IFx1ODhBQlx1NTM4Qlx1N0YyOVx1NjIxMCAxLzBcdUZGMENcdThGRDlcdTUzRUZcdTgwRkRcdTRGMUFcdTVCRkNcdTgxRjQgQ2hyb21lIFx1NEUwQVx1NzY4NFx1NjAyN1x1ODBGRFx1OTVFRVx1OTg5OFxyXG4gICAgICAvLyAgICAgZHJvcF9jb25zb2xlOiB0cnVlLCAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTUzQkJcdTk2NjQgY29uc29sZVxyXG4gICAgICAvLyAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTUzQkJcdTk2NjQgZGVidWdnZXJcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyAgIGZvcm1hdDoge1xyXG4gICAgICAvLyAgICAgY29tbWVudHM6IGZhbHNlIC8vIFx1NTIyMFx1OTY2NFx1NkNFOFx1OTFDQVxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSxcclxuICAgICAgYXNzZXRzSW5saW5lTGltaXQ6IDQgKiAxMDI0LCAvLyBcdTYyNTNcdTUzMDVcdTUxODVcdTgwNTRcdTk2MDhcdTUwM0M0a2JcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLCAvLyBcdTg5QzRcdTVCOUFcdTg5RTZcdTUzRDFcdThCNjZcdTU0NEFcdTc2ODQgY2h1bmsgXHU1OTI3XHU1QzBGLCBcdTZEODhcdTk2NjRcdTYyNTNcdTUzMDVcdTU5MjdcdTVDMEZcdThEODVcdThGQzc1MDBrYlx1OEI2Nlx1NTQ0QVxyXG4gICAgICAvLyBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTYyNTNcdTUzMDVcdTUyMzBkaXN0XHU0RTBCXHU3Njg0XHU0RTBEXHU1NDBDXHU3NkVFXHU1RjU1LFx1NUMwNlx1NjU4N1x1NEVGNlx1N0M3Qlx1NTc4QmNzc1x1MzAwMWpzXHUzMDAxanBnXHU3QjQ5XHU2NTg3XHU0RUY2XHU1MjA2XHU1RjAwXHU1QjU4XHU1MEE4XHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBcInN0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IFwic3RhdGljL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF1cIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtQLFNBQVMsY0FBYyxlQUFlLGVBQWU7QUFDdlMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyw0QkFBNEI7QUFUckMsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTSxZQUFZLGNBQWMsS0FBSyxVQUFVLCtCQUErQixDQUFDO0FBRy9FLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFFBQU0sT0FBTyxRQUFRLElBQUk7QUFFekIsUUFBTSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQzlCLFNBQU87QUFBQTtBQUFBLElBRUwsTUFBTSxJQUFJO0FBQUEsSUFDVixRQUFRO0FBQUE7QUFBQTtBQUFBLE1BR04sT0FBTyxDQUFDO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osa0JBQWtCO0FBQUEsUUFDaEIsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLE1BQ0QscUJBQXFCO0FBQUE7QUFBQSxRQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0FBQUEsUUFDekQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBO0FBQUEsUUFFVCxTQUFTLENBQUMsT0FBTyxZQUFZO0FBQUEsUUFDN0IsV0FBVyxDQUFDLGFBQWEsQ0FBQztBQUFBO0FBQUEsUUFFMUIsVUFBVTtBQUFBO0FBQUEsVUFFUixTQUFTO0FBQUEsVUFDVCxVQUFVO0FBQUE7QUFBQSxVQUNWLGtCQUFrQjtBQUFBLFFBQ3BCO0FBQUE7QUFBQSxRQUVBLEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVc7QUFBQSxVQUNULGFBQWE7QUFBQSxZQUNYLFlBQVk7QUFBQSxVQUNkLENBQUM7QUFBQSxRQUNIO0FBQUE7QUFBQSxRQUVBLE1BQU0sQ0FBQyxnQkFBZ0I7QUFBQTtBQUFBLFFBRXZCLFlBQVksQ0FBQyxLQUFLO0FBQUE7QUFBQSxRQUVsQixLQUFLO0FBQUEsTUFDUCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBO0FBQUEsTUFFUCxPQUFPO0FBQUEsUUFDTCxXQUFXLEtBQUssS0FBSyxrQ0FBVyxZQUFZO0FBQUEsUUFDNUMsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztBQUFBLE1BQzlCO0FBQUEsTUFDQSxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUE7QUFBQSxVQUVKLGdCQUFnQixZQUFZLFNBQVM7QUFBQTtBQUFBLFFBRXZDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQTtBQUFBLE1BQ1IsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BWVIsbUJBQW1CLElBQUk7QUFBQTtBQUFBLE1BQ3ZCLHVCQUF1QjtBQUFBO0FBQUE7QUFBQSxNQUV2QixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import html from "@rollup/plugin-html";

const version = require("fs").existsSync(".git")
  ? String(
      require("child_process").execSync("git rev-parse --short HEAD")
    ).trim()
  : "static"; // append short git commit to bundles
const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: production
      ? "public/build/bundle-v" + version + ".js"
      : "public/build/bundle.js",
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        !production
          ? css.write("bundle.css")
          : css.write(`bundle-v${version}.css`);
      },
    }),
    // svelte({
    // 	compilerOptions: {
    // 		dev: !production
    // 	}
    // }),
    html({
      template: async ({ attributes, files, meta, publicPath, title }) => {
        const script = (files.js || [])
          .map(({ fileName }) => {
            return `<script defer src='${fileName}'></script>`;
          })
          .join("\n");

        const css = (files.css || [])
          .map(({ fileName }) => {
            return `<link rel='stylesheet' href='${fileName}'>`;
          })
          .join("\n");
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <title>شعر و گنج</title>
          <link rel="icon" type="image/png" href="/images/group_25.png"/>
          ${css}        
          ${script}
         </head>
        <body></body>
        </html>     
`;
      },
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    replace({
      FOO: "bar",

      // 2 level deep object should be stringify
      process: JSON.stringify({
        env: {
          isProd: production,
        },
      }),
    }),
    // globals(),

    // replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
  ],
  watch: {
    clearScreen: false,
  },
};

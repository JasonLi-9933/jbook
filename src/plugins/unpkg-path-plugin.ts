import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin", // for debugging purpose
    setup(build: esbuild.PluginBuild) {
      // `build` represent the build process
      // onResolve step is where esbuild figures out where files are located

      // handle root entry file 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" }; // namespace is used to identify/group files: {filter: xxx, namespace: 'b'} for options
      });

      // handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        };
      });

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // `filter` when onResolve/onLoad callback get executed
        console.log("onResole", args);
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};

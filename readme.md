# Reproduction for [esbuild - #2707](https://github.com/evanw/esbuild/issues/2707).

```bash
git clone git@github.com:brillout/esbuild-reprod-2707
cd esbuild-reprod-2707/
pnpm install
pnpm run reprod
```

Same as single line (copy-paste me):

```shell
git clone git@github.com:brillout/esbuild-reprod-2707 && cd esbuild-reprod-2707/ && pnpm install && pnpm run reprod
```

Throws:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/assets/Page-3GRCYC2A.js' imported from /home/romuuu/tmp/esbuild-reprod-2707/dist/renderHtml.js
    at new NodeError (node:internal/errors:372:5)
    at finalizeResolution (node:internal/modules/esm/resolve:405:11)
    at moduleResolve (node:internal/modules/esm/resolve:966:10)
    at defaultResolve (node:internal/modules/esm/resolve:1176:11)
    at ESMLoader.resolve (node:internal/modules/esm/loader:605:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:318:18)
    at ESMLoader.import (node:internal/modules/esm/loader:404:22)
    at importModuleDynamically (node:internal/modules/esm/translators:106:35)
    at importModuleDynamicallyCallback (node:internal/process/esm_loader:35:14)
    at renderHtml (file:///home/romuuu/tmp/esbuild-reprod-2707/dist/renderHtml.js:7:20) {
  code: 'ERR_MODULE_NOT_FOUND'
}
```

The problem is:

```js
// dist/renderHtml.js

// src/logo.svg
var logo_default = "/assets/logo-RT6VWYUT.svg"; // ✅ Correct: asset URL has /assets/ prefix

// src/renderHtml.js
renderHtml();
async function renderHtml() {
  const { Page } = await import("/assets/Page-3GRCYC2A.js"); // ❌ Expected: import("./Page-3GRCYC2A.js")
  const html = `<!DOCTYPE html>
<html>
  <head>
    <link rel="icon" href="${logo_default}" />
  </head>
  <body>
    ${Page()}
  </body>
</html>`;
  console.log(html);
}
```

This is caused by [the `publicPath: '/assets/'` setting in `build.js`](https://github.com/brillout/esbuild-reprod-2707/blob/main/build.js#L7). Remove this setting and re-run `$ pnpm run reprod` to get:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="icon" href="./logo-RT6VWYUT.svg" />
  </head>
  <body>
    Hello
  </body>
</html>
```

import esbuild from 'esbuild'

build()

function build() {
  return esbuild.build({
    publicPath: '/assets/', // Remove this line to fix error
    entryPoints: ['./src/renderHtml.js'],
    outdir: './dist/',
    format: 'esm',
    target: 'es2020',
    bundle: true,
    splitting: true,
    loader: {
      '.svg': 'file'
    }
  })
}

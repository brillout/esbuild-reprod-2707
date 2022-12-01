import esbuild from 'esbuild'

build()

function build() {
  return esbuild.build({
    entryPoints: ['./src/renderHtml.js'],
    format: 'esm',
    target: 'es2020',
    publicPath: '/assets/',
    splitting: true,
    outdir: './dist/',
    bundle: true,
    loader: {
      '.svg': 'file'
    }
  })
}

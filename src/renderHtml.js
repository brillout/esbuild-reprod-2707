import logoUrl from './logo.svg'

renderHtml()

async function renderHtml() {
  const { Page } = await import('./Page.js')

  const html = `<!DOCTYPE html>
<html>
  <head>
    <link rel="icon" href="${logoUrl}" />
  </head>
  <body>
    ${Page()}
  </body>
</html>`

  console.log(html)
}

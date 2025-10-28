#!/usr/bin/env node
/**
 * Inline CSS built by Vite into dist/index.html to remove the render-blocking stylesheet request.
 * - Finds <link rel="stylesheet" href="/assets/*.css"> tags
 * - Replaces them with <style>...</style> containing the file content
 * Safe for single-page apps with small CSS bundles (~<30KB).
 */
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function inlineCss() {
  const distDir = path.resolve(__dirname, '..', 'dist')
  const indexPath = path.join(distDir, 'index.html')

  let html
  try {
    html = await readFile(indexPath, 'utf8')
  } catch (err) {
    console.error('[inline-css] No se pudo leer dist/index.html:', err)
    process.exit(0) // No es fatal en entornos donde no existe dist aún
  }

  // Captura href que comience con /assets o ./assets
  const linkRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["'](?:\.?\/)?(assets\/[^"']+\.css)["'][^>]*>/gi

  let anyReplaced = false
  const newHtml = html.replace(linkRegex, (match, hrefRelative) => {
    try {
      const cssPath = path.join(distDir, hrefRelative)
  const css = readFileSync(cssPath, 'utf8')
      anyReplaced = true
      return `<!-- inlined: ${hrefRelative} -->\n<style>${css}</style>`
    } catch (e) {
      console.warn('[inline-css] No se pudo inyectar', hrefRelative, e)
      return match
    }
  })

  // Si no hubo reemplazos, salir silenciosamente
  if (!anyReplaced) {
    console.log('[inline-css] No se encontraron hojas de estilo para inyectar.')
    return
  }

  await writeFile(indexPath, newHtml)
  console.log('[inline-css] CSS inyectado en index.html.')
}

// Node 18+ ESM entry
import { readFileSync } from 'fs'
inlineCss().catch((e) => {
  console.error('[inline-css] Error inesperado:', e)
  process.exit(1)
})

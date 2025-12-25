#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, '../dist')
const ssrDir = path.resolve(__dirname, '../dist-ssr')

async function loadSSR() {
  const manifestPath = path.resolve(ssrDir, '.vite/manifest.json')
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`[SSG] Manifest no encontrado en ${manifestPath}`)
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  const entryMeta = manifest['src/main.ssg.tsx']
  if (!entryMeta || !entryMeta.file) {
    throw new Error('[SSG] Entrada SSR no encontrada en el manifest para src/main.ssg.tsx')
  }
  const entry = path.resolve(ssrDir, entryMeta.file)
  const mod = await import(entry)
  return mod
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function writeHtmlForRoute(template, routePath, html, head) {
  // Replace root content
  let out = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  // Remove existing <title> and main description to avoid duplicates
  out = out.replace(/<title>[\s\S]*?<\/title>/, '')
  out = out.replace(/<meta name="description"[\s\S]*?>/g, '')
  out = out.replace(/<link rel="canonical"[\s\S]*?>/g, '')
  out = out.replace(/<meta property="og:title"[\s\S]*?>/g, '')
  out = out.replace(/<meta property="og:description"[\s\S]*?>/g, '')
  out = out.replace(/<meta property="og:url"[\s\S]*?>/g, '')
  out = out.replace(/<meta name="twitter:title"[\s\S]*?>/g, '')
  out = out.replace(/<meta name="twitter:description"[\s\S]*?>/g, '')

  // Inject head tags before </head>
  out = out.replace('</head>', `${head}\n</head>`)

  const normalized = routePath.replace(/^\//, '')
  if (!normalized) {
    // Home: overwrite dist/index.html
    fs.writeFileSync(path.join(distDir, 'index.html'), out, 'utf-8')
  } else {
    const targetDir = path.join(distDir, normalized)
    ensureDir(targetDir)
    fs.writeFileSync(path.join(targetDir, 'index.html'), out, 'utf-8')
  }
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error('[SSG] dist/ no existe. Ejecuta "vite build" primero.')
    process.exit(1)
  }
  if (!fs.existsSync(ssrDir)) {
    console.error('[SSG] dist-ssr/ no existe. Ejecuta "vite build --ssr src/main.ssg.tsx" primero.')
    process.exit(1)
  }

  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
  const { getRoutes, render } = await loadSSR()
  const routes = getRoutes()

  for (const routePath of routes) {
    try {
      const { html, head } = render(routePath)
      writeHtmlForRoute(template, routePath, html, head)
      console.log(`[SSG] ✓ ${routePath}`)
    } catch (e) {
      console.error(`[SSG] Error prerenderizando ${routePath}:`, e)
      process.exitCode = 1
    }
  }

  console.log('[SSG] Prerender finalizado.')
}

main()

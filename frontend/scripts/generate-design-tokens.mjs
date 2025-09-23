// scripts/generate-design-tokens.mjs
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

const designPath = path.join(root, 'design.json')
const outPath = path.join(root, 'src', 'styles', 'design-tokens.css')

function toKebab(name) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function writeColors(colors) {
  const lines = []
  const write = (obj, prefix = '') => {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'object' && v !== null) {
        // special cases
        if (k === 'chart') {
          for (const [key, val] of Object.entries(v)) {
            lines.push(`  --chart-${key}: ${val};`)
          }
        } else if (k === 'sidebar') {
          const map = {
            background: 'sidebar',
            foreground: 'sidebar-foreground',
            primary: 'sidebar-primary',
            primaryForeground: 'sidebar-primary-foreground',
            accent: 'sidebar-accent',
            accentForeground: 'sidebar-accent-foreground',
            border: 'sidebar-border',
            ring: 'sidebar-ring',
          }
          for (const [key, val] of Object.entries(v)) {
            const cssKey = map[key] || `sidebar-${toKebab(key)}`
            lines.push(`  --${cssKey}: ${val};`)
          }
        } else {
          write(v, `${prefix}${toKebab(k)}-`)
        }
      } else {
        lines.push(`  --${prefix}${toKebab(k)}: ${v};`)
      }
    }
  }

  write(colors)
  return lines.join('\n')
}

async function main() {
  const json = JSON.parse(await fs.readFile(designPath, 'utf8'))
  const light = writeColors(json.colors.light)
  const dark = writeColors(json.colors.dark)

  const css = `/* This file is auto-generated from design.json. Do not edit manually. */\n:root {\n${light}\n}\n\n.dark {\n${dark}\n}\n`

  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, css, 'utf8')
  console.log(`Generated ${path.relative(root, outPath)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

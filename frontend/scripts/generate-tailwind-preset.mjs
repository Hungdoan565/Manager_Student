// scripts/generate-tailwind-preset.mjs
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

const designPath = path.join(root, 'design.json')
const outPath = path.join(root, 'src', 'styles', 'tailwind-preset.js')

async function main() {
  const json = JSON.parse(await fs.readFile(designPath, 'utf8'))
  const { typography, spacing, borderRadius, shadows } = json

  const preset = {
    theme: {
      extend: {
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        fontWeight: typography.fontWeight,
        lineHeight: typography.lineHeight,
        spacing,
        borderRadius,
        boxShadow: shadows,
      },
    },
  }

  const js = `// Auto-generated from design.json. Do not edit manually.\nexport default ${JSON.stringify(preset, null, 2)}\n`
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, js, 'utf8')
  console.log(`Generated ${path.relative(root, outPath)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

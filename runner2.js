#!/usr/bin/env node

// This will compile a script first, to make sure globals are working right

import { readFile, writeFile, unlink, realpath } from 'node:fs/promises'
import { basename, dirname } from 'node:path'
import frida from 'frida'
import * as compiler from 'frida-compile'

// these should be exported in package.json
import { getNodeSystem } from 'frida-compile/dist/system/node.js'
import ts from 'frida-compile/ext/typescript.js'

const [, name, processName, scriptFile] = process.argv

if (!processName || !scriptFile) {
  console.error(`Usage: ${basename(name, '.js')} <PROCESS_NAME> <SCRIPTFILE>`)
  process.exit(1)
}

// this is a hacky method that just injects the bridges, you probly only need one of these
// I don't like that I have to use real files here (instead of source string) but I could not figure out how to inject source for compiler.build
async function compileScript(filePath, opts = {}) {
  const realFilename = await realpath(filePath)
  const entrypoint = `${realFilename}-compiled-${Date.now()}.js`
  const s = `import ObjC from 'frida-objc-bridge'\nimport Java from 'frida-java-bridge'\n${await readFile(realFilename, 'utf8')}`
  await writeFile(entrypoint, s)

  const system = getNodeSystem()
  const projectRoot = process.cwd()
  const assets = compiler.queryDefaultAssets(projectRoot, system)

  const compilerOpts = {
    projectRoot,
    entrypoint,
    sourceMaps: opts.sourceMaps ? 'included' : 'omitted',
    compression: opts.compress ? 'terser' : 'none',
    assets,
    system
  }

  const bundle = compiler.build({
    ...compilerOpts,
    onDiagnostic({ file, start, messageText }) {
      if (file !== undefined) {
        const { line, character } = ts.getLineAndCharacterOfPosition(file, start)
        const message = ts.flattenDiagnosticMessageText(messageText, '\n')
        console.log(`${file.fileName} (${line + 1},${character + 1}): ${message}`)
      } else {
        console.log(ts.flattenDiagnosticMessageText(messageText, '\n'))
      }
    }
  })

  await unlink(entrypoint)
  return bundle
}

const device = await frida.getUsbDevice()
const session = await device.attach(processName)
const script = await session.createScript(await compileScript(scriptFile))
await script.load()

#!/usr/bin/env node

// this will bundle the script using esbuild

import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'
import frida from 'frida'
import * as esbuild from 'esbuild'

const [, name, processName, scriptFile] = process.argv

if (!processName || !scriptFile) {
  console.error(`Usage: ${basename(name, '.js')} <PROCESS_NAME> <SCRIPTFILE>`)
  process.exit(1)
}

const code = (
  await esbuild.build({
    write: false,
    bundle: true,
    entryPoints: [scriptFile],
    inject: ['esbuild-globals.js'],
    format: 'esm',
    minify: true,
    sourcemap: true
  })
)?.outputFiles[0].text

const device = await frida.getUsbDevice()
const session = await device.attach(processName)
const script = await session.createScript(code)
await script.load()

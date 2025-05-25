#!/usr/bin/env node

// This will just run a script, without doing anything to it

import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'
import frida from 'frida'

const [, name, processName, scriptFile] = process.argv

if (!processName || !scriptFile) {
  console.error(`Usage: ${basename(name, '.js')} <PROCESS_NAME> <SCRIPTFILE>`)
  process.exit(1)
}

const device = await frida.getUsbDevice()
const session = await device.attach(processName)
const script = await session.createScript(await readFile(scriptFile, 'utf8'))
await script.load()

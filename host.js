import { readFile } from 'fs/promises'
import frida from 'frida'

import { makeDefaultCompilerOptions, build } from 'frida-compile'

const opt = makeDefaultCompilerOptions()
opt.entrypoint = 'frida/test_globals.frida.js'
opt.projectRoot = 'frida'

await build(opt)

console.log(opt)


const device = await frida.getDevice('0bba24e2f3ca859d1766cc298b1bcd588ad1984a');
// const frontmostApp = await device.getFrontmostApplication();
// const session = await device.attach(frontmostApp.pid);
// const script = await session.createScript(await readFile('frida/test_globals.frida.js', 'utf8'));
// await script.load();

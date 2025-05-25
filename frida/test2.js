import ObjC from 'frida-objc-bridge'
import Java from 'frida-java-bridge'

console.log('test2')
console.log('ObjC', typeof ObjC, ObjC?.available)
console.log('Java', typeof Java, Java?.available)

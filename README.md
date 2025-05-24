This is tooling for testing with Frida on 17.x branch.

```
# python tooling
python3 -m venv venv
source venv/bin/activate
pip install frida-tools

# node tooling
npm i

# compile manually
node_modules/.bin/frida-compile -S -c frida/test_globals.frida.js -o /tmp/agent.js


# run it on 0bba24e2f3ca859d1766cc298b1bcd588ad1984a device
frida -D 0bba24e2f3ca859d1766cc298b1bcd588ad1984a "App Store" /tmp/agent.js
```

Currently, I'm on frida 17.0.5

```sh
npm list

frida-17@0.0.0 /Users/konsumer/Desktop/frida-17
├── @types/frida-gum@19.0.0
├── frida-compile@18.0.0
├── frida-java-bridge@7.0.1
├── frida-objc-bridge@8.0.4
└── frida@17.0.5
```

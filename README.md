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

Currently, compiler produces code with errors.

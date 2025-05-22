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
```

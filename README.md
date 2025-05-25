This is tooling for testing with Frida on 17.x branch.

I am testing with iOS, but Android is similar:

```sh
# setup fresh 17.0.5 frida-tools
python3 -m venv venv
source venv/bin/activate
pip install frida==17.0.5 frida-tools==14.0.2

# run it using old-style, with frida-tools
frida -U  "App Store" -l frida/test1.js

# compile & run using node-tools
npx frida-compile frida/test2.js -o /tmp/test2.js
./runner.js "App Store" /tmp/test2.js

# use integrated compiler with old-style scripts
./runner2.js "App Store" frida/test1.js
```

You might also have to do 'AppStore', depending on iOS version.

You should see output like this, telling you that Java & ObjC are defined, and if each is `available`:

```
test1
ObjC object true
Java object false
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

# Node-Arduino
Use a web interface to control an arduino connect to the server

## Getting Started

To get you started you can simply clone the node-arduino repository, install the dependencies and run the server:

### Prerequisites

You need git to clone the node-arduino repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test node-arduino. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone node-arduino

Clone the node-arduino repository using [git](http://git-scm.com/):

```
git clone https://github.com/benjamincaldwell/node-arduino.git
cd node-arduino
```

### Install Dependencies

* We get the server tools we depend upon via `npm`: [npm](https://docs.npmjs.com/getting-started/installing-node).
* We get the browser code via `bower`: [bower](http://bower.io/#install-bower).

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

### Run the Application

```
node index.js
```

or 
```
npm start
```
go to [localhost:8888](localhost:8888).

##Permission issue on linux
see [https://github.com/rwaldron/johnny-five/issues/53](https://github.com/rwaldron/johnny-five/issues/53)

##License
The MIT License ([MIT](LICENSE))

Copyright (c) 2016 Benjamin Caldwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

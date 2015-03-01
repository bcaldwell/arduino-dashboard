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

* We get the server tools we depend upon via `npm`, the [npm](https://docs.npmjs.com/getting-started/installing-node).
* We get the browser code via `bower`, a [bower](http://bower.io/#install-bower).

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


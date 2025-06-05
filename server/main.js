const ReactServerRegister = require("react-server-dom-webpack/node-register");
ReactServerRegister();

const babelRegister = require("@babel/register");
babelRegister({
    ignore:[/[\\\/](dist|server|node_modules)[\\\/]/],
    plugins: ["@babel/transform-modules-commonjs"],
});

require("./server")();

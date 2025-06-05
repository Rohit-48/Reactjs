const path = require("node:path");
const {readFileSync} = require("node:fs")
const Fastify = require("fastify")
const fastifyStaticPlugin = require("@fastify/static");
const AppImport = require("../src/App.jsx");
const { privateDecrypt } = require("node:crypto");
const App  = AppImport.default

const MANIFEST = readFileSync(
    path.resolve(__dirname, "../dist/react-client-manifest.json"), "utf-8"
);

const MODULE_MAP = JSON.parse(MANIFEST);
const PORT = process.env.PORT ? process.env.PORT : 3000;

const fastify = Fastify({
    logger:{
        transport:{
            target: "pino-pretty"
        },
    },
});
fastify.register(fastifyStaticPlugin, {
    root: path.join(__dirname, "../dist"),
    prefix: "/assets/",

});

fastify.register(fastifyStaticPlugin, {
    root: path.join(__dirname, "../public"),
    decorateReply: false,

});

fastify.get("/", async function rootHandler(request, reply) {
        return reply.sendFile("index.html")
})
fastify.get("/react-flight", function ReactFlightHandler(request, reply){
    try {
        reply.header("Content-Type", "application/octet-stream")
        return reply.send( `1:{"name": "App", "env", "Server", "key": null, "owner": null, "props":{}} 
        0:D"S1"
        0:["$","div", null, {"children":["$", "h1", null, {"children":"Notes App"}, "$1"]},"$1"]
        0:["$","div", null, {"children":["$", "h1", null, {"children":"Notes App"}, "$1"]},"$1"]
        0:["$","div", null, {"children":["$", "h1", null, {"children":"Notes App"}, "$1"]},"$1"]
        0:["$","div", null, {"children":["$", "h1", null, {"children":"Notes App"}, "$1"]},"$1"]
        `);
    } catch (err) {
        request.log.error("react-flight err", err)
        throw err
    }
})

module.exports = async function start() {
    try {
        await fastify.listen({port:PORT})
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
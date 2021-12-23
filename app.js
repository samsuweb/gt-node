var apm = require('elastic-apm-node').start({
  serviceName: 'gt-node',
  
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://<vm_ip>:30337',
})
var sleep = require('sleep');

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/host', async (request, reply) => {
  let os = require("os");
  return { hostname: os.hostname() }
})

fastify.get('/sleep', async (request, reply) => {
  sleep.sleep(10)
  return { sleep_done: true }
})


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000,'0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

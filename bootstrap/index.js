require('babel-core/register')({
    ignore: [/node_modules/]
})
require('babel-polyfill')
require('./server.js')
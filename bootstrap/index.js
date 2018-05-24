// require('babel-core/register')({
//     ignore: [/node_modules/]
// })
require('babel-core/register')();
require('babel-polyfill')
require('./server.js')

global.logger = require('../utils/logger')
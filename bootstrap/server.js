import pathConfig from '../build/pathConfig'
import fs from 'fs'
import path from 'path'
import express from 'express'
import router from '../src/server/router'
import generateTemplate from './template'

const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const serverInfo = `express/${require('express/package.json').version}`

const app = express()

const createRenderer = ({default: serverRender}, {template}) => {
    return async (url)=>{
       const pageInfo =  await serverRender(url)
       if(pageInfo.status == 200){
         pageInfo.html = generateTemplate(template,pageInfo)
       }
       return pageInfo
    }
}

let renderer
let readyPromise 
const templatePath = isProd ? `${pathConfig.clientOutput}/index.html` : pathConfig.htmlTemplate
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require(`${pathConfig.serverOutput}/server.js`)
  renderer = createRenderer(bundle, {template})
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('../build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
  index: false
})

// app.use(compression({ threshold: 0 }))
app.use(pathConfig.staticPublicPath,serve(pathConfig.clientOutput))

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
// app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

const render = async (req, res) => {
  logger.info('start rendering')
  const s = Date.now()
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)
  if(!renderer){
    res.send('Page is initializing, please refresh leater')
  }
  const result = await renderer(req.originalUrl)
  if(result.status == 200){
    res.send(result.html)
  }else if(result.status == 301){
    res.redirect(result.context.url)
  }else{
    res.status(500).send('500 | Internal Server Error')
  }
  if (!isProd) {
    logger.info(`whole request: ${Date.now() - s}ms`)
  }
}

app.use('/api',router)

app.get('*', isProd ? render : (req, res) => {
  logger.info('request is coming')
  logger.info(readyPromise)
  // res.send('request is coming')
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  logger.info(`server started at http://127.0.0.1:${port}`)
})

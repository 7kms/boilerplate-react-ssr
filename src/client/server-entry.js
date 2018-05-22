import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './pages/routes'
import '~less/base.less'

export default (url) => {
    const context = {}
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={url} context={context}>
            {renderRoutes(routes)}
        </StaticRouter>
    )
    if(context.url){
        return {
            status: 301,
            context
        }
    }else{
        return {
            status: 200,
            html
        }
    }
}

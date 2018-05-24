import '~less/base.less'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import routes from './pages/routes'
import { Provider } from 'react-redux'
import configureStore from './redux/store'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const loadBranchData = (store,pathname) => {
    const branch = matchRoutes(routes, pathname)
    // console.log(branch)
    const promises = branch.map(({ route, match }) => {
        const {loadInitialData} = route.component
      return loadInitialData
        ? loadInitialData(store,match)
        : Promise.resolve(null)
    })
    return Promise.all(promises)
}

//https://redux.js.org/recipes/server-rendering
export default async (url) => {
    const store = configureStore({})
    const context = {}
    await loadBranchData(store,url)
    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={url} context={context}>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    )
    if(context.url){
        return {
            status: 301,
            context
        }
    }else{
        const finalState = store.getState()
        return {
            status: 200,
            html,
            finalState
        }
    }
}

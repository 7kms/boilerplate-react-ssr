import React from 'react'
import PropTypes from 'prop-types'
import { hydrate,render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import '~less/base.less'
import routes from './pages/routes'


const App = ({routes})=>{
    return (
        <BrowserRouter>
            {renderRoutes(routes)}
        </BrowserRouter>
    )
}
App.propTypes = {routes: PropTypes.array.isRequired}

hydrate(<App routes={routes}/>, document.getElementById('root'))

if(process.env.NODE_ENV === 'development'){
    if(module.hot){
        module.hot.accept(['./pages/routes'], function() {
            const newRoutes = require('./pages/routes').default
            render(<App routes={newRoutes}/>, document.getElementById('root'))
        })
    }
}

